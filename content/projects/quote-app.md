## Overview

A modern, responsive React application that fetches and displays random quotes. Built with Vite and React.

## Problem

Finding inspiring or relevant quotes for presentations, social media, or personal motivation can often be time-consuming and tedious.

## Solution

A simple, elegant web interface that allows users to instantly generate random quotes, filter them by length, and copy them to their clipboard with a single click.

## Features

- **Random Quotes:** Fetches quotes from a public API (`dummyjson.com/quotes`).
- **Length Filtering:** Filter quotes by length:
  - Any Length
  - Short (< 50 characters)
  - Medium (50 - 120 characters)
  - Long (> 120 characters)
- **Copy to Clipboard:** Easily copy your favorite quotes to your clipboard with a visual confirmation.
- **Loading States:** Visual feedback (spinner and button states) while fetching quotes.

## Tech Stack

- **Frontend Framework:** React (v19)
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Styling:** CSS3

## Architecture

- Client-side Single Page Application (SPA) built with React.
- Communicates with a third-party public REST API (`dummyjson.com/quotes`) to fetch quote data asynchronously.

## Deployment

- Configured for deployment to GitHub Pages using the `gh-pages` package.
