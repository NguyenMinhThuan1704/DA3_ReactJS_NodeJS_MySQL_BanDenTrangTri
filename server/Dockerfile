# Sử dụng image node chính thức, bản nhẹ
FROM node:18-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Copy file package.json & package-lock.json trước để cài package
COPY package*.json ./

# Cài đặt các package
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở port 3000 (hoặc port bạn dùng cho Express)
EXPOSE 3000

# Command để start server
CMD ["npm", "start"]
