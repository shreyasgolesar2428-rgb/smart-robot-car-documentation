# Autonomous Obstacle Avoiding and Line Following Smart Car
### Official Engineering Project Documentation Website
**Inspired by the SpiRobE Robotic Hand Technical Documentation System**

---

## 🎓 Academic Credentials & Project Metadata

- **Project Title:** Autonomous Obstacle Avoiding and Line Following Smart Car
- **Lead Author / Student:** Shreyas Golesar
- **Department:** Department of Mechanical Engineering
- **Institution:** Sanjivani University, Kopergaon
- **Academic Year:** First Year B.Tech (2026–2027)
- **Project Guide:** Dr. Kiran Wakchaure (Department of Mechanical Engineering)
- **Engineering Team Members:**
  1. Shreyas Golesar
  2. Tejas Fatangade
  3. Tejas Kote
  4. Atharv Patole

---

## 📖 Project Overview

This repository contains the **complete, production-ready engineering documentation website** for the *Autonomous Obstacle Avoiding and Line Following Smart Car*. Built specifically to replicate the technical rigor, multi-chapter navigation, clean aesthetic, and interactive features of premier engineering documentation platforms (such as VitePress, Docusaurus, GitBook, and the SpiRobE reference project).

### Key Technical Capabilities:
- **Mode 1 (Optical Line Following):** Continuous differential steering along high-contrast tracks using dual TCRT5000 optical infrared reflectance sensors and LM393 comparators.
- **Mode 2 (Acoustic Obstacle Avoidance):** 40 kHz acoustic time-of-flight proximity scanning via HC-SR04 ultrasonic transducer with an autonomous 20 cm reactive stopping and evasive steering boundary (Stop &rarr; Reverse 300 ms &rarr; Turn Right 450 ms &rarr; Re-scan).
- **Mode 3 (Wireless Bluetooth Teleoperation):** Real-time smartphone remote driving via HC-05 2.4 GHz Bluetooth module (SPP profile at 9600 baud) with safe 3.3V resistive voltage level shifting.
- **Microcontroller Core:** 8-bit ATmega328P (Arduino UNO) executing a deterministic multi-mode executive state machine.
- **Actuation & Drive:** L298N dual full-bridge motor driver supplying four high-torque 1:48 BO gear motors in a 4-wheel drive (4WD) skid-steer configuration.

---

## 🗂️ Documentation Structure (31 Chapters)

The documentation is organized into 6 logical engineering sections across 31 chapters:

1. **Section I: Foundation & Overview**
   - Ch 01: Home & Academic Frontispiece
   - Ch 02: Project Overview
   - Ch 03: Abstract
   - Ch 04: Introduction
   - Ch 05: Problem Statement
   - Ch 06: Project Objectives

2. **Section II: Literature & System Architecture**
   - Ch 07: Literature Review
   - Ch 08: Existing System Analysis
   - Ch 09: Proposed System Innovations
   - Ch 10: System Architecture (5-Tier Cyber-Physical Decomposition)
   - Ch 11: Complete System Block Diagram

3. **Section III: Hardware Specifications & Schematics**
   - Ch 12: Hardware Requirements & Bill of Materials (BOM)
   - Ch 13: Software Requirements & Toolchain
   - Ch 14: Component Description (Datasheets & Working Physics)
   - Ch 15: Master Circuit Diagram
   - Ch 16: Pin Configuration & Mapping Table

4. **Section IV: Operational Principles & Modes**
   - Ch 17: Working Principle (Physics of IR, Sound & Kinematics)
   - Ch 18: Line Following Mode (Truth Table & Tuning)
   - Ch 19: Obstacle Avoiding Mode (Ranging & Evasive Maneuvers)
   - Ch 20: Bluetooth Control Mode (UART Command Protocol)
   - Ch 21: System Working Flowchart
   - Ch 22: Algorithmic Formulations & Pseudocode

5. **Section V: Firmware Implementation & Testing**
   - Ch 23: Complete Production Arduino Source Code (`Smart_Car_Firmware.ino`)
   - Ch 24: Step-by-Step Physical Implementation & Assembly
   - Ch 25: Empirical Testing and Experimental Results

6. **Section VI: Evaluation, Applications & Future Scope**
   - Ch 26: Real-World Applications (AGVs, Healthcare, Industry 4.0)
   - Ch 27: Technical Advantages
   - Ch 28: System Limitations
   - Ch 29: Future Scope & Roadmap (PID, Computer Vision, SLAM)
   - Ch 30: Conclusion & Academic Acknowledgments
   - Ch 31: Formal Academic References (IEEE Format)

---

## 📐 Vector Diagrams Included (`diagrams/`)

The website includes 8 high-resolution, responsive SVG engineering schematics with an interactive full-screen modal inspector (zoom, pan, and download):

1. `1-system-block-diagram.svg` &mdash; Complete signal routing, power rails, and bus architecture.
2. `2-arduino-uno-connections.svg` &mdash; Microcontroller pin mapping and peripheral wiring.
3. `3-l298n-motor-driver-connections.svg` &mdash; Dual H-bridge power stage and 4-motor wiring.
4. `4-ir-sensor-connections.svg` &mdash; Dual TCRT5000 optical sensors, LM393 comparators, and truth table.
5. `5-ultrasonic-sensor-connections.svg` &mdash; HC-SR04 acoustic transducer and time-of-flight pulse timing waveform.
6. `6-bluetooth-module-connections.svg` &mdash; HC-05 2.4 GHz module, 3.3V voltage divider network, and command table.
7. `7-overall-circuit-diagram.svg` &mdash; Complete master electrical wiring schematic connecting all components.
8. `8-system-working-flowchart.svg` &mdash; Master executive control cycle, decision branches, and fail-safe loops.

---

## 💻 Arduino Firmware (`code/Smart_Car_Firmware.ino`)

The firmware is fully written, commented, and production-tested:
- **No external third-party dependencies** (uses standard `<SoftwareSerial.h>`).
- **Hardware serial left open** on pins D0/D1 for continuous USB monitoring.
- **Timer PWM speed control** on pins D5 (`ENA`) and D10 (`ENB`).
- **Non-blocking sensor acquisition** with loop cycles under 20 ms.

---

## 🚀 How to Deploy to GitHub Pages (Step-by-Step)

The documentation website is 100% static (pure HTML5, CSS3, and vanilla modern JavaScript) with **zero build dependencies**, **zero node_modules**, and **zero compile steps**. It runs seamlessly on any web host and is perfectly optimized for GitHub Pages.

### Method 1: Deploy Directly via GitHub Web UI (Easiest)

1. Log into your GitHub account and create a new repository (e.g., `smart-car-documentation`).
2. Upload all files from this project folder into the root of the repository:
   ```
   ├── index.html
   ├── css/
   │   └── docs.css
   ├── js/
   │   ├── docs.js
   │   └── search-index.js
   ├── diagrams/
   │   ├── 1-system-block-diagram.svg
   │   ├── 2-arduino-uno-connections.svg
   │   ├── 3-l298n-motor-driver-connections.svg
   │   ├── 4-ir-sensor-connections.svg
   │   ├── 5-ultrasonic-sensor-connections.svg
   │   ├── 6-bluetooth-module-connections.svg
   │   ├── 7-overall-circuit-diagram.svg
   │   └── 8-system-working-flowchart.svg
   ├── code/
   │   └── Smart_Car_Firmware.ino
   └── README.md
   ```
3. In your GitHub repository, click on **Settings** (tab at the top).
4. In the left sidebar, click on **Pages** (under the "Code and automation" section).
5. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
6. Wait 60–90 seconds. Refresh the page to see your live URL:
   ```
   https://<your-username>.github.io/smart-car-documentation/
   ```

### Method 2: Deploy via Git CLI

```bash
# Navigate to the project directory
cd smart-car-documentation

# Initialize local git repository
git init
git add .
git commit -m "Initial commit: Complete Autonomous Smart Car Engineering Documentation"

# Link to your remote GitHub repository
git branch -M main
git remote add origin https://github.com/<your-username>/smart-car-documentation.git

# Push to GitHub
git push -u origin main
```
Then enable GitHub Pages under **Settings &rarr; Pages &rarr; main branch / root** as described in Method 1.

---

## 🖥️ Local Preview (Zero Setup Needed)

To preview the website locally on your computer:
- **Direct Browser Opening:** Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari). Everything works immediately!
- **Using Python Local Server:**
  ```bash
  python -m http.server 8080
  # Open in browser: http://localhost:8080
  ```
- **Using VS Code Live Server:** Right-click `index.html` &rarr; click *Open with Live Server*.

---

## ⌨️ Interactive Features Reference

- **Search Modal:** Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd> on macOS) or click the search bar at the top to search across all 31 chapters, technical terms, pinouts, and algorithms.
- **Copy Code Buttons:** Click the *Copy* button on any algorithm or code block to instantly copy code to your clipboard.
- **Dark / Light Theme:** Click the moon/sun icon in the top navigation bar to toggle between dark and light modes. Your preference is automatically saved in `localStorage`.
- **Diagram Inspector:** Click *Full View* on any technical figure to inspect the vector schematic in high resolution or click *SVG* to download the original vector asset.
- **On This Page (TOC):** The right sidebar dynamically tracks your reading position and highlights active sub-headings via high-performance `IntersectionObserver`.

---

## 📜 License

This documentation and firmware are distributed under the **MIT Open Source License**. Academic institutions, students, and engineers are welcome to study, build, modify, and reference this work with appropriate attribution.
