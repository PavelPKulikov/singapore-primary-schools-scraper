# 🏫 Singapore Primary Schools Scraper

This project scrapes primary school data from the Singapore Ministry of Education website ([moe.gov.sg](https://www.moe.gov.sg/schoolfinder?journey=Primary%20school)) and exports it into a structured Google Sheet.

## 🔍 Task
Extract the following fields for each school:
- Primary School Name
- School Category (Type)
- Contact Email

## ⚙️ Technologies Used
- Google Apps Script
- UrlFetchApp
- JSON parsing
- Google Sheets

## 🚀 Solution
- Sent HTTP requests using `UrlFetchApp` to fetch JSON data from the MOE School Finder.
- Parsed the response and extracted required fields.
- Visited each school's page and extracted contact email using HTML parsing.
- Wrote data into a Google Sheet with automation-ready logic.

## 📊 Result
A fully automated Google Sheet with clean and organized data of 182 primary schools in Singapore.

## 🧠 My Role
I handled the full implementation from idea to automation: fetching, parsing, structuring the output, and preparing the script for repeated use.

## 📎 Preview
*Link to the Google Sheet or screenshots can be added here.*
