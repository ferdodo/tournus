FROM node

WORKDIR /tournus
COPY package.json .
RUN npm install
RUN npm audit --audit-level=moderate

COPY . .
RUN npm run build
CMD npm run dev