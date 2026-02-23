RaceTracker is a **real-time race tracking tool** designed to provide cost-effective timing solutions for running events. The application targets low-budget races that require professional timing capabilities without the expense of commercial timing systems.

## Development Approach
The software followed an **iterative development methodology**, with continuous feedback from my running coach and fellow athletes informing each cycle of improvements. This user-centered approach ensured the software addressed real operational needs. A key milestone occurred when my coach requested RaceTracker for the **Cahill Cup**, validating both the tool's readiness and the effectiveness of iterative development driven by user feedback.

## Technical Reflections

Experience gained from subsequent projects has provided valuable perspective on RaceTracker's initial technical decisions.

### Technology Stack

The application was built with vanilla JavaScript, HTML, and CSS. While this approach provided a solid foundation, a modern framework such as **Vue.js** would have offered significant advantages. Direct DOM manipulation was required for critical features like real-time leaderboard updates, resulting in increased code complexity. A reactive framework would have simplified state management and improved code maintainability through _declarative data binding_.

### Data Persistence

A notable limitation is the absence of editable data export formats. While the application successfully exports results to **PDF**, it lacks support for **JSON-based saving and re-importing**. This functionality would be straightforward to implement with modern frameworks, eliminating the need for complex DOM manipulation when updating the leaderboard from saved data.

### Architecture

The data architecture relied on _parallel arrays_—separate arrays for names, times, and other athlete attributes. While functional, this approach created maintenance challenges and limited scalability. An **object-oriented design** using athlete objects would have provided better data encapsulation and simplified the codebase by consolidating related information into single entities within a unified array structure.

## Production Deployment: Cahill Cup 2023

RaceTracker was successfully deployed at the **2023 Cahill Cup Road Race**, an annual competition between St. Patrick's College Silverstream and St. Patrick's College Wellington.

The event comprised three age-group races **(U14, U16, and U19)**, all tracked using RaceTracker. The system was operated by a **single person with no prior training**—a critical test of the application's usability, as I was competing in the race and unavailable for technical support.

The deployment proved successful, with the software performing reliably throughout the event. Results were generated as PDFs and distributed to athletes and their families. This real-world validation demonstrated both the robustness of the iterative development process and the value of incorporating user feedback into software design.
