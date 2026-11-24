/*
 * =====================================================================================
 * PROJECT: AUTONOMOUS OBSTACLE AVOIDING AND LINE FOLLOWING SMART CAR
 * AUTHOR: Smart Robotics Engineering Team
 * PLATFORM: Arduino UNO (ATmega328P) + L298N Motor Driver
 * SENSORS: HC-SR04 Ultrasonic Sensor + Dual TCRT5000 IR Line Tracking Modules
 * TELEMETRY: HC-05 Bluetooth Wireless Module (2.4GHz Serial)
 * LICENSE: MIT Open Source
 * =====================================================================================
 */

#include <SoftwareSerial.h>

// -------------------------------------------------------------------------------------
// 1. PIN DEFINITIONS & HARDWARE MAPPING
// -------------------------------------------------------------------------------------
// L298N Dual H-Bridge Motor Driver
const int ENA = 5;    // Left Motors PWM Speed Control (D5)
const int IN1 = 6;    // Left Motors Forward Direction (D6)
const int IN2 = 7;    // Left Motors Backward Direction (D7)
const int IN3 = 8;    // Right Motors Forward Direction (D8)
const int IN4 = 9;    // Right Motors Backward Direction (D9)
const int ENB = 10;   // Right Motors PWM Speed Control (D10)

// HC-SR04 Ultrasonic Distance Sensor
const int TRIG_PIN = A0;  // Ultrasonic Sonic Burst Trigger (A0)
const int ECHO_PIN = A1;  // Ultrasonic Time-of-Flight Echo (A1)

// Dual TCRT5000 Infrared (IR) Line Tracking Sensors
const int IR_LEFT_PIN  = A2;  // Left Optical Track Sensor (A2)
const int IR_RIGHT_PIN = A3;  // Right Optical Track Sensor (A3)

// HC-05 Bluetooth Wireless Module
// Arduino Pin 2 (RX) -> Connects to HC-05 TX
// Arduino Pin 3 (TX) -> Connects to HC-05 RX (via 1k/2k resistor voltage divider)
SoftwareSerial bluetooth(2, 3); // RX, TX

// -------------------------------------------------------------------------------------
// 2. SYSTEM CONSTANTS & CALIBRATION THRESHOLDS
// -------------------------------------------------------------------------------------
const int BASE_SPEED   = 160;  // Default PWM speed (0 - 255)
const int TURN_SPEED   = 180;  // Turn PWM boost for differential steering
const int SAFE_DISTANCE = 20;  // Obstacle detection threshold (in cm)

// Operational Modes
enum OperatingMode {
  MODE_LINE_FOLLOWING = 1,     // Mode 1: Optical Line Tracking
  MODE_OBSTACLE_AVOIDING = 2,  // Mode 2: Ultrasonic Collision Avoidance
  MODE_BLUETOOTH_MANUAL = 3,   // Mode 3: Wireless Smartphone Teleoperation
  MODE_IDLE = 0                // Mode 0: Standby / Safety Stop
};

OperatingMode currentMode = MODE_LINE_FOLLOWING; // Default startup mode
char btCommand = 'S';                            // Last received Bluetooth character

// -------------------------------------------------------------------------------------
// 3. SETUP & HARDWARE INITIALIZATION
// -------------------------------------------------------------------------------------
void setup() {
  // Initialize Serial Monitor and Bluetooth
  Serial.begin(9600);
  bluetooth.begin(9600);
  Serial.println(F("=================================================="));
  Serial.println(F("[SYSTEM] SMART CAR ROBOTICS FIRMWARE INITIALIZING"));
  Serial.println(F("=================================================="));

  // Configure Motor Driver Pins as Outputs
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);
  stopMotors();

  // Configure Ultrasonic Sensor Pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // Configure IR Sensor Pins as Digital Inputs
  pinMode(IR_LEFT_PIN, INPUT);
  pinMode(IR_RIGHT_PIN, INPUT);

  Serial.println(F("[STATUS] All Subsystems Online. Default Mode: Line Following"));
}

// -------------------------------------------------------------------------------------
// 4. MAIN EXECUTIVE LOOP
// -------------------------------------------------------------------------------------
void loop() {
  // Check for incoming Bluetooth wireless commands
  checkBluetoothInput();

  // Execute operational logic depending on current active mode
  switch (currentMode) {
    case MODE_LINE_FOLLOWING:
      executeLineFollowing();
      break;

    case MODE_OBSTACLE_AVOIDING:
      executeObstacleAvoidance();
      break;

    case MODE_BLUETOOTH_MANUAL:
      executeBluetoothManual();
      break;

    case MODE_IDLE:
    default:
      stopMotors();
      break;
  }
}

// -------------------------------------------------------------------------------------
// 5. MODE 1: OPTICAL LINE FOLLOWING ALGORITHM
// -------------------------------------------------------------------------------------
void executeLineFollowing() {
  // Read IR reflectance (0 = White Surface, 1 = Black Line detected)
  int leftIR  = digitalRead(IR_LEFT_PIN);
  int rightIR = digitalRead(IR_RIGHT_PIN);

  // Case 1: Both sensors on white surface -> Move Straight Forward
  if (leftIR == 0 && rightIR == 0) {
    moveForward(BASE_SPEED, BASE_SPEED);
  }
  // Case 2: Left sensor detects line -> Turn Left to re-align
  else if (leftIR == 1 && rightIR == 0) {
    turnLeft(TURN_SPEED, TURN_SPEED);
  }
  // Case 3: Right sensor detects line -> Turn Right to re-align
  else if (leftIR == 0 && rightIR == 1) {
    turnRight(TURN_SPEED, TURN_SPEED);
  }
  // Case 4: Both sensors detect black line (Intersection or Stop line)
  else if (leftIR == 1 && rightIR == 1) {
    stopMotors();
  }
}

// -------------------------------------------------------------------------------------
// 6. MODE 2: ULTRASONIC OBSTACLE AVOIDANCE ALGORITHM
// -------------------------------------------------------------------------------------
void executeObstacleAvoidance() {
  long distanceCm = getUltrasonicDistance();

  // Print telemetry to Serial
  Serial.print(F("[RADAR] Clearance Distance: "));
  Serial.print(distanceCm);
  Serial.println(F(" cm"));

  if (distanceCm > SAFE_DISTANCE) {
    // Path is clear: Continue moving forward
    moveForward(BASE_SPEED, BASE_SPEED);
  } else {
    // Obstacle detected within 20cm!
    stopMotors();
    delay(150);

    // Step 1: Reverse briefly for turning clearance
    moveBackward(150, 150);
    delay(300);
    stopMotors();
    delay(100);

    // Step 2: Pivot turn right to avoid collision
    turnRight(TURN_SPEED, TURN_SPEED);
    delay(450);
    stopMotors();
    delay(100);
  }
}

// -------------------------------------------------------------------------------------
// 7. MODE 3: WIRELESS BLUETOOTH MANUAL TELEOPERATION
// -------------------------------------------------------------------------------------
void checkBluetoothInput() {
  if (bluetooth.available()) {
    btCommand = bluetooth.read();
    Serial.print(F("[BT COMMAND] "));
    Serial.println(btCommand);

    // Mode selection characters:
    // '1' -> Line Following Mode
    // '2' -> Obstacle Avoidance Mode
    // '3' -> Manual Teleoperation Mode
    // '0' -> Emergency Stop / Idle
    if (btCommand == '1') {
      currentMode = MODE_LINE_FOLLOWING;
      Serial.println(F("[MODE SWITCH] Activated: Line Following"));
    } else if (btCommand == '2') {
      currentMode = MODE_OBSTACLE_AVOIDING;
      Serial.println(F("[MODE SWITCH] Activated: Obstacle Avoidance"));
    } else if (btCommand == '3') {
      currentMode = MODE_BLUETOOTH_MANUAL;
      Serial.println(F("[MODE SWITCH] Activated: Bluetooth Manual Drive"));
    } else if (btCommand == '0') {
      currentMode = MODE_IDLE;
      stopMotors();
      Serial.println(F("[MODE SWITCH] Standby Mode"));
    }
  }
}

void executeBluetoothManual() {
  // Directional controls from smartphone app:
  // 'F' -> Forward, 'B' -> Backward, 'L' -> Left, 'R' -> Right, 'S' -> Stop
  switch (btCommand) {
    case 'F': moveForward(BASE_SPEED, BASE_SPEED); break;
    case 'B': moveBackward(BASE_SPEED, BASE_SPEED); break;
    case 'L': turnLeft(TURN_SPEED, TURN_SPEED); break;
    case 'R': turnRight(TURN_SPEED, TURN_SPEED); break;
    case 'S':
    default:
      stopMotors();
      break;
  }
}

// -------------------------------------------------------------------------------------
// 8. ULTRASONIC DISTANCE MEASUREMENT ROUTINE
// -------------------------------------------------------------------------------------
long getUltrasonicDistance() {
  // Clear trigger pin
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  // Send 10 microsecond HIGH pulse
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Measure round-trip echo pulse duration (timeout = 25000 µs ~ 4 meters)
  long duration = pulseIn(ECHO_PIN, HIGH, 25000);

  // If timeout occurred, return safe high value
  if (duration == 0) return 400;

  // Sound speed = 340 m/s = 0.034 cm/µs; Distance = (Duration * 0.034) / 2
  long distanceCm = duration * 0.034 / 2;
  return distanceCm;
}

// -------------------------------------------------------------------------------------
// 9. MOTOR DRIVER PRIMITIVE ROUTINES
// -------------------------------------------------------------------------------------
void moveForward(int leftSpeed, int rightSpeed) {
  analogWrite(ENA, leftSpeed);
  analogWrite(ENB, rightSpeed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void moveBackward(int leftSpeed, int rightSpeed) {
  analogWrite(ENA, leftSpeed);
  analogWrite(ENB, rightSpeed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void turnLeft(int leftSpeed, int rightSpeed) {
  analogWrite(ENA, leftSpeed);
  analogWrite(ENB, rightSpeed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void turnRight(int leftSpeed, int rightSpeed) {
  analogWrite(ENA, leftSpeed);
  analogWrite(ENB, rightSpeed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void stopMotors() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}
