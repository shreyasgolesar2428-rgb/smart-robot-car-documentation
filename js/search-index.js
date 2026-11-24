/**
 * AUTONOMOUS OBSTACLE AVOIDING & LINE FOLLOWING SMART CAR
 * CLIENT-SIDE SEARCH INDEX FOR ALL 31 CHAPTERS
 */
const DOCS_SEARCH_INDEX = [
  {
    id: "ch1",
    num: "01",
    title: "Home & Cover Page",
    category: "Preface & Foundation",
    excerpt: "Project documentation cover, Sanjivani University, Dr. Kiran Wakchaure, Mechanical Engineering, Shreyas Golesar, team members, quick specs.",
    keywords: "home cover sanjivani kopergaon shreyas golesar tejas fatangade tejas kote atharv patole kiran wakchaure mechanical engineering"
  },
  {
    id: "ch2",
    num: "02",
    title: "Project Overview",
    category: "Preface & Foundation",
    excerpt: "Executive summary of the Autonomous Smart Car, tri-modal architecture (Line Following, Obstacle Avoiding, Bluetooth Control), cyber-physical system.",
    keywords: "overview tri-mode line following obstacle avoiding bluetooth cyber-physical AMR AGV"
  },
  {
    id: "ch3",
    num: "03",
    title: "Abstract",
    category: "Preface & Foundation",
    excerpt: "Formal academic abstract covering background, microcontroller selection, sensor fusion, dual H-bridge motor drive, 7.4V battery pack, and results.",
    keywords: "abstract academic methodology arduino uno l298n hc-sr04 tcrt5000 hc-05 lithium-ion performance"
  },
  {
    id: "ch4",
    num: "04",
    title: "Introduction",
    category: "Preface & Foundation",
    excerpt: "Evolution of autonomous mobile robots (AMRs) and Automated Guided Vehicles (AGVs) in Industry 4.0, interdisciplinary engineering scope.",
    keywords: "introduction robotics AGV AMR industry 4.0 embedded systems mechanical design automation"
  },
  {
    id: "ch5",
    num: "05",
    title: "Problem Statement",
    category: "Preface & Foundation",
    excerpt: "Challenges of manual material transport in manufacturing and warehouses, rigidity and high costs of traditional wire-guided AGVs.",
    keywords: "problem statement warehouse collision manual material transport high cost magnetic tape guide"
  },
  {
    id: "ch6",
    num: "06",
    title: "Objectives",
    category: "Preface & Foundation",
    excerpt: "Primary and secondary engineering objectives: 4WD chassis, optical line following, ultrasonic obstacle avoidance, Bluetooth override, low BOM cost.",
    keywords: "objectives goals requirements 4wd chassis line following obstacle avoidance bluetooth teleoperation"
  },
  {
    id: "ch7",
    num: "07",
    title: "Literature Review",
    category: "Literature & Architecture",
    excerpt: "Critical review of academic research papers on AGV kinematics, ultrasonic time-of-flight ranging, infrared reflectance, and comparative analysis.",
    keywords: "literature review research papers IEEE kinematics acoustic ranging differential drive comparison table"
  },
  {
    id: "ch8",
    num: "08",
    title: "Existing System",
    category: "Literature & Architecture",
    excerpt: "Detailed analysis of conventional wire-guided AGVs, single-function hobby robotics, 433MHz RF cars, and their architectural shortcomings.",
    keywords: "existing system drawbacks limitations traditional AGV 433mhz rf single mode collision hazard"
  },
  {
    id: "ch9",
    num: "09",
    title: "Proposed System",
    category: "Literature & Architecture",
    excerpt: "Tri-mode hybrid autonomous robotic vehicle with dynamic sensor fusion, deterministic state machine switching, and level-shifted telemetry.",
    keywords: "proposed system tri-mode hybrid state machine sensor fusion fail-safe 3.3v level shifting"
  },
  {
    id: "ch10",
    num: "10",
    title: "System Architecture",
    category: "Literature & Architecture",
    excerpt: "Five-tier cyber-physical system architecture: Physical actuation, sensory transduction, wireless telemetry, computation logic, power regulation.",
    keywords: "system architecture 5-tier cyber physical computation sensory power distribution data flow"
  },
  {
    id: "ch11",
    num: "11",
    title: "Block Diagram",
    category: "Literature & Architecture",
    excerpt: "Complete vector system block diagram detailing signal routing, power rails, sensor input buses, microcontroller logic, and motor outputs.",
    keywords: "block diagram diagram 1 signal flow power rail analog digital gpio pwm timer serial telemetry"
  },
  {
    id: "ch12",
    num: "12",
    title: "Hardware Requirements",
    category: "Hardware Specifications",
    excerpt: "Comprehensive itemized Bill of Materials (BOM) table, specifications, operating currents, voltages, and total power budget calculation.",
    keywords: "hardware requirements bill of materials BOM cost table components current consumption power budget"
  },
  {
    id: "ch13",
    num: "13",
    title: "Software Requirements",
    category: "Hardware Specifications",
    excerpt: "Arduino IDE v2.x, avr-gcc compiler, SoftwareSerial library, baud rate configurations, USB UART bridge drivers, Android terminal app.",
    keywords: "software requirements arduino ide avr-gcc softwareserial baud rate 9600 android terminal CH340"
  },
  {
    id: "ch14",
    num: "14",
    title: "Component Description",
    category: "Hardware Specifications",
    excerpt: "In-depth engineering profiles: Arduino UNO (ATmega328P), L298N driver, TCRT5000 IR sensors, HC-SR04 ultrasonic, HC-05 Bluetooth, BO motors, chassis, battery.",
    keywords: "component description arduino uno l298n tcrt5000 hc-sr04 hc-05 bo motors chassis 18650 battery"
  },
  {
    id: "ch15",
    num: "15",
    title: "Circuit Diagram",
    category: "Hardware Specifications",
    excerpt: "Master electrical circuit schematic showing complete interconnection of Arduino UNO, L298N, HC-SR04, dual IR sensors, HC-05, and 4 DC motors.",
    keywords: "circuit diagram schematic diagram 7 electrical connections wiring power rails common ground"
  },
  {
    id: "ch16",
    num: "16",
    title: "Pin Configuration",
    category: "Hardware Specifications",
    excerpt: "Master pin mapping table for all Arduino digital, PWM, analog, and SoftwareSerial pins with signal types, logic levels, and electrical roles.",
    keywords: "pin configuration pinout table ENA ENB IN1 IN2 IN3 IN4 D5 D6 D7 D8 D9 D10 A0 A1 A2 A3 D2 D3"
  },
  {
    id: "ch17",
    num: "17",
    title: "Working Principle",
    category: "Operational Principles",
    excerpt: "Fundamental physics and control theory: Infrared albedo reflectance, ultrasonic time-of-flight acoustic wave formula, differential drive kinematics.",
    keywords: "working principle optical reflectance albedo snell law time of flight acoustic kinematics ICC"
  },
  {
    id: "ch18",
    num: "18",
    title: "Line Following Mode",
    category: "Operational Principles",
    excerpt: "Mode 1 deep dive: Dual IR sensor placement, 2-sensor truth table (00, 10, 01, 11), steering responses, PWM duty cycles, ambient light calibration.",
    keywords: "line following mode 1 truth table optical track differential steering pwm 160 turn 180"
  },
  {
    id: "ch19",
    num: "19",
    title: "Obstacle Avoiding Mode",
    category: "Operational Principles",
    excerpt: "Mode 2 deep dive: Ultrasonic ranging, 20 cm critical braking threshold, reactive reverse maneuver (300ms) and pivot turn (450ms).",
    keywords: "obstacle avoiding mode 2 ultrasonic ranging 20cm threshold reverse turn right pulseIn safe clearance"
  },
  {
    id: "ch20",
    num: "20",
    title: "Bluetooth Control Mode",
    category: "Operational Principles",
    excerpt: "Mode 3 deep dive: 2.4GHz RF serial communication, UART protocol, smartphone command characters ('F','B','L','R','S','1','2','3','0'), latency.",
    keywords: "bluetooth control mode 3 hc-05 teleoperation commands forward reverse left right stop SPP app"
  },
  {
    id: "ch21",
    num: "21",
    title: "Flowchart",
    category: "Operational Principles",
    excerpt: "Complete vector system working flowchart showing power-on initialization, executive polling, multi-mode branching, and motor actuation loop.",
    keywords: "flowchart diagram 8 executive loop state machine decision diamond branching setup loop"
  },
  {
    id: "ch22",
    num: "22",
    title: "Algorithm",
    category: "Operational Principles",
    excerpt: "Formal pseudocode algorithms for Master Executive Loop, Line Following Subroutine, Obstacle Avoidance Subroutine, and Bluetooth Teleoperation.",
    keywords: "algorithm pseudocode master loop line subroutine obstacle subroutine ultrasonic timing"
  },
  {
    id: "ch23",
    num: "23",
    title: "Arduino Source Code",
    category: "Firmware Implementation",
    excerpt: "Complete production Arduino C/C++ firmware (Smart_Car_Firmware.ino) with syntax highlighting, copy-to-clipboard, and line-by-line engineering explanation.",
    keywords: "arduino source code firmware c++ Smart_Car_Firmware.ino setup loop analogWrite digitalRead"
  },
  {
    id: "ch24",
    num: "24",
    title: "Implementation",
    category: "Firmware Implementation",
    excerpt: "Step-by-step physical assembly, chassis construction, motor mounting, sensor alignment, wiring harness routing, and initial smoke test.",
    keywords: "implementation assembly build guide hardware chassis soldering wiring breadboard smoke test"
  },
  {
    id: "ch25",
    num: "25",
    title: "Testing and Results",
    category: "Firmware Implementation",
    excerpt: "Empirical verification: Line tracking success rate, ultrasonic distance error curve, obstacle avoidance success rate, Bluetooth range, battery run time.",
    keywords: "testing results verification experimental data error curve latency battery discharge test"
  },
  {
    id: "ch26",
    num: "26",
    title: "Applications",
    category: "Evaluation & Conclusion",
    excerpt: "Real-world engineering applications: Industrial warehouse AGVs, contactless hospital medicine delivery, factory assembly line transport, STEM robotics.",
    keywords: "applications industrial intralogistics warehouse AGV hospital medicine delivery robotics education"
  },
  {
    id: "ch27",
    num: "27",
    title: "Advantages",
    category: "Evaluation & Conclusion",
    excerpt: "Engineering benefits: Ultra-low BOM cost (<$40), tri-modal versatility, modular maintenance, high-torque 4WD skid-steering, open-source AVR.",
    keywords: "advantages benefits low cost high torque modularity versatility safety open source"
  },
  {
    id: "ch28",
    num: "28",
    title: "Limitations",
    category: "Evaluation & Conclusion",
    excerpt: "Technical limitations: Optical IR sunlight sensitivity, ultrasonic specular reflection on angled planes, open-loop odometry, Bluetooth range.",
    keywords: "limitations drawbacks sunlight sensitivity specular reflection open loop odometry range limit"
  },
  {
    id: "ch29",
    num: "29",
    title: "Future Scope",
    category: "Evaluation & Conclusion",
    excerpt: "Future enhancements: Optical wheel encoders with PID control, ESP32 computer vision lane detection, 2D LiDAR SLAM, IoT cloud telemetry.",
    keywords: "future scope enhancements PID control rotary encoders ESP32 computer vision LiDAR SLAM IoT MQTT"
  },
  {
    id: "ch30",
    num: "30",
    title: "Conclusion",
    category: "Evaluation & Conclusion",
    excerpt: "Final summary of achievements, design objectives fulfilled, academic acknowledgment to Dr. Kiran Wakchaure and team members.",
    keywords: "conclusion summary achievements project evaluation sanjivani university mechanical engineering"
  },
  {
    id: "ch31",
    num: "31",
    title: "References",
    category: "Evaluation & Conclusion",
    excerpt: "Academic citations in IEEE format, component datasheets (ATmega328P, L298N, HC-SR04, HC-05), robotics textbooks, and open-source documentation.",
    keywords: "references citations IEEE bibliography datasheets textbooks publications"
  }
];
