# 🎰 EuroMillions Prediction & Visualization

This project aims to **analyze EuroMillions draw data**, generate **probable numbers based on frequency analysis**, and visualize the results using **bar charts**.

## 📌 Features

- Fetches the latest EuroMillions draw results from an API.
- Cleans and transforms the data into a structured format.
- Calculates the frequency of each number and star drawn.
- Identifies the least frequent numbers and stars (most likely to appear).
- Generates **bar charts** to visualize number and star frequencies.
- Saves all results in JSON and image format.

---

## 🚀 Installation

### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/Masterblyat/EuroMillions.git
cd euromillions-analysis
```

### 2️⃣ Install dependencies
```bash
npm install
```

## 📊 How It Works

### 🏗 Data Processing
- Fetches the latest EuroMillions results from the API.
- Cleans and structures the data into a result.json file.
- Calculates the frequency of numbers and stars appearing.

### 📉 Predictions
- Uses the least frequent numbers as the most probable picks.
- Generates a suggested combination based on historical patterns.

### 📊 Visualization
Generates two bar charts:
- frequency_chart_numbers.png → Shows the frequency of drawn numbers.
- frequency_chart_stars.png → Shows the frequency of drawn stars.

## 🏃‍♂️ Running the Project
Run the analysis and generate charts

```bash
npm run start
```

This will: ✅ Fetch the latest results
✅ Process & analyze data
✅ Generate prediction
✅ Create frequency charts