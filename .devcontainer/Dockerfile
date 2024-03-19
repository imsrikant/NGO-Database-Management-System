FROM ubuntu:latest

# Install necessary tools
RUN apt-get update && apt-get install -y wget gnupg2 lsb-release

# Add MySQL's public key
RUN wget https://dev.mysql.com/get/mysql-apt-config_0.8.17-1_all.deb
RUN dpkg -i mysql-apt-config_0.8.17-1_all.deb

# Install MySQL
RUN apt-get update && apt-get install -y mysql-server

