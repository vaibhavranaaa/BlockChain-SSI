# 🔐 Blockchain-Based Self-Sovereign Identity (SSI)

A blockchain-based **Self-Sovereign Identity (SSI)** application that allows users to manage their digital identity, access verifiable credentials, authenticate securely, and verify identity information. The project combines modern web technologies with blockchain integration to explore secure, decentralized digital identity management.

## 🚀 Features

- **User Authentication** – User registration and login.
- **Digital Identity Management** – Manage digital identity information.
- **Identity Wallet** – Access and manage identity-related information.
- **Verifiable Credentials** – View and manage digital credentials.
- **Credential Verification** – Verify credential information through the application.
- **Secure Authentication** – JWT-based authentication for API requests.
- **Dashboard** – Access identity and credential management features.
- **Activity Tracking** – View application activity.
- **Settings** – Manage application settings.
- **Blockchain Integration** – Hyperledger Fabric integration for blockchain-backed identity operations.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- React Router
- Tailwind CSS
- Lucide React

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Maven

### Database
- MongoDB

### Security
- JSON Web Tokens (JWT)
- Spring Security

### Blockchain
- Hyperledger Fabric Gateway

## 📂 Project Structure

```text
BlockChain-SSI/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
│
├── backend-auth/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── mvnw
│
├── Trees/
│
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Java JDK 21](https://adoptium.net/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- Git
- A configured Hyperledger Fabric network for blockchain-backed operations

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd BlockChain-SSI
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Configure MongoDB

Start MongoDB and configure the database connection in:

```text
backend-auth/src/main/resources/application.yml
```

The default database URI is:

```text
mongodb://localhost:27017/ssi_auth
```

Update it if your MongoDB instance uses a different connection URI.

### 3. Run the Backend

Open a terminal in the project root and execute:

**Windows PowerShell:**

```powershell
cd backend-auth
.\mvnw.cmd spring-boot:run
```

**Linux/macOS:**

```bash
cd backend-auth
chmod +x mvnw
./mvnw spring-boot:run
```

The backend is configured to run at:

```text
http://localhost:8080
```

### 4. Run the Frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal by Vite. It is commonly:

```text
http://localhost:5173
```

### 5. Build the Frontend

To create a production frontend build:

```bash
cd frontend
npm run build
```

## 📱 Application Pages

The application includes the following pages:

| Page | Description |
|---|---|
| Home | Landing page |
| Register | User registration |
| Login | User authentication |
| Dashboard | Overview of identity features |
| Identity | Digital identity management |
| Credentials | Credential management |
| Wallet | Identity wallet |
| Authenticate | Authentication workflow |
| Verify | Credential verification |
| Activity | Activity information |
| Settings | Application settings |

## 🔗 System Architecture

The application follows a frontend-backend architecture:

1. **React frontend:** Provides the user interface for identity and credential management.
2. **Spring Boot backend:** Handles API requests and application logic.
3. **MongoDB:** Stores application data.
4. **JWT authentication:** Supports authenticated API requests.
5. **Hyperledger Fabric:** Provides blockchain network integration for supported identity operations.

## 🔒 Security Considerations

- Configure JWT secrets securely using environment variables or a secret manager.
- Never commit private keys, passwords, or production credentials.
- Configure HTTPS and appropriate access controls before deployment.
- Protect identity information and sensitive user data.
- Verify Hyperledger Fabric network and certificate configuration before enabling blockchain-backed operations.

**Note:** This project is intended for learning and development. Production use requires additional security testing, deployment configuration, and review of identity and credential management workflows.

## 🐛 Troubleshooting

- **Frontend cannot connect to backend:** Check that Spring Boot is running on port `8080` and verify the frontend API base URL.
- **MongoDB connection error:** Ensure MongoDB is running and the configured URI is correct.
- **Fabric connection error:** Check the Fabric network endpoint, TLS certificates, and identity configuration.
- **Frontend dependency issues:** Run `npm install` inside the `frontend` directory.
- **Port already in use:** Stop the process using the port or update the application configuration.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your implementation.
5. Submit a pull request.

## 📄 License

No license has been specified yet. Add a `LICENSE` file to define the terms under which others may use or distribute this project.

---

**Developed as a project exploring blockchain-based Self-Sovereign Identity, digital credentials, and decentralized identity management.** 🔐
