#!/bin/bash

# Устанавливаем зависимости
npm install

# Делаем билд React/Vite
npm run build

# Запускаем сервер для статики
npx serve -s dist -l $PORT
