# Browser Fingerprinting Data Collector

A lightweight JavaScript tool for collecting browser fingerprinting data and device information for analytics or identification purposes.

## Overview

This project implements a data collection script that gathers various browser and device attributes to create a unique fingerprint of the user's system. The collected data is sent to a server endpoint for processing and analysis.

## Features

- Collects comprehensive browser information
- Generates canvas fingerprints
- Retrieves WebGL renderer information
- Captures screen and window dimensions
- Records timezone data
- Detects installed plugins
- Provides user interface feedback upon data submission

## Data Collected

The script collects the following information:

- **User Agent**: Browser and operating system information
- **Plugins**: List of installed browser plugins
- **App Version**: Browser version information
- **Language Settings**: User language preferences and system language settings
- **Canvas Fingerprint**: Unique hash generated from canvas rendering
- **Timezone**: User's timezone offset
- **Platform**: Operating system platform
- **Screen Information**: Resolution, color depth, and pixel ratio
- **Client Size**: Browser window dimensions and screen positioning
- **Browser Details**: App name, code name, and other browser-specific attributes
- **WebGL Information**: Graphics card vendor and renderer
- **Navigator Details**: Comprehensive navigator object properties

## Implementation

The script uses a combination of standard Web APIs to collect data:
- `navigator` object properties
- Canvas fingerprinting techniques
- WebGL API for hardware information
- DOM measurements for screen and window sizes

## Usage

1. Include the script in your HTML file:

```html
<script src="collector.js"></script>
```

2. The script automatically runs when the DOM content is loaded and sends data to the configured endpoint.

3. The script provides visual feedback to the user after data submission.

## User Interface

The script includes a simple UI feedback system that:
- Shows a spinner during data submission
- Displays a success message with a checkmark icon when submission is successful
- Shows an error indication if submission fails

## Functions

- `plugins()`: Collects and processes browser plugin information
- `canvas()`: Generates a canvas fingerprint
- `clientSize()`: Retrieves window and client size parameters
- `screenSize()`: Gets screen resolution and color information
- `changeStatus()`: Updates the UI based on submission status
- `getWebGLInfo()`: Retrieves WebGL renderer and vendor information
- `navigatorInfo()`: Collects comprehensive navigator properties
- `sayswho()`: Detects browser name and version

## Browser Compatibility

The script includes fallbacks and optional chaining to ensure compatibility with modern browsers, handling cases where certain APIs might not be available.

## Privacy Considerations

When implementing this script, consider:
- Informing users about data collection
- Complying with relevant privacy regulations (GDPR, CCPA, etc.)
- Storing and processing the collected data securely
- Providing opt-out mechanisms where required by law

## Error Handling

The script includes basic error handling for server responses:
- Status 400 (Bad Request) handling
- Status 429 (Too Many Requests) handling
- General error catching and logging

## Dependencies

The script has no external dependencies and uses only native browser APIs.
