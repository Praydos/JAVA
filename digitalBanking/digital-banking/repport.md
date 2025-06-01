# Digital Banking Application: A Comprehensive Implementation of Modern Banking Systems

## Abstract

This document presents the design and implementation of a comprehensive Digital Banking Application developed as part of the Architecture JEE and Distributed Systems curriculum at ENSET. The system employs a microservices-oriented architecture with a Spring Boot backend and Angular frontend, demonstrating enterprise-level software engineering practices including secure authentication mechanisms, RESTful API design, and modern web development frameworks.

The application facilitates comprehensive banking operations management, enabling administrators to oversee customer accounts, execute financial transactions, and maintain operational oversight while providing customers with secure access to account information and transaction histories.

## 1. Introduction

### 1.1 Project Overview

The Digital Banking Application represents a full-stack enterprise solution designed to address the computational requirements of modern financial institutions. The system architecture integrates contemporary technologies and industry best practices to deliver a scalable, secure, and maintainable banking platform.

### 1.2 Scope and Objectives

The primary objectives of this implementation encompass:

1. **Security Implementation**: Development of a robust authentication and authorization framework utilizing JWT tokens and OAuth2 protocols
2. **Data Management**: Implementation of comprehensive CRUD operations for customer and account management
3. **Transaction Processing**: Enabling secure financial operations including credit, debit, and inter-account transfers
4. **User Interface Design**: Creation of an intuitive, responsive web interface optimized for administrative and customer interactions
5. **Architectural Excellence**: Application of established software engineering principles and design patterns
6. **Service Layer Architecture**: Proper separation of concerns across presentation, business logic, and data access layers
7. **Error Handling**: Implementation of comprehensive validation and exception management systems

### 1.3 Technology Stack

The application leverages the following technological components:

**Backend Technologies:**
- Spring Boot Framework (Java-based enterprise application framework)
- Spring Security (Authentication and authorization)
- Spring Data JPA (Object-relational mapping)
- MariaDB (Relational database management system)
- JWT (JSON Web Token authentication)
- OAuth2 (Authorization framework)

**Frontend Technologies:**
- Angular 19 (TypeScript-based web application framework)
- Bootstrap (CSS framework for responsive design)
- RxJS (Reactive programming library)
- Chart.js (Data visualization library)

## 2. System Architecture

### 2.1 Architectural Pattern

The application implements a layered architecture pattern following the principles of separation of concerns and dependency inversion. The system is structured into distinct layers:

- **Presentation Layer**: Angular-based user interface components
- **Controller Layer**: Spring Boot REST API endpoints
- **Service Layer**: Business logic implementation
- **Data Access Layer**: JPA repositories and database interaction
- **Domain Layer**: Entity models and business objects

### 2.2 Database Design

The system employs a relational database schema designed to maintain data integrity and support efficient query operations. The database structure implements the following entity relationships:

```sql
-- Customer Entity
Customer (1) -> (N) BankAccount
BankAccount (1) -> (N) AccountOperation
```

The inheritance strategy utilizes `SINGLE_TABLE` inheritance for account types, optimizing query performance while maintaining type safety.

## 3. Backend Implementation

### 3.1 Domain Model Architecture

The domain model represents the core business entities within the banking system:

```java
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @OneToMany(mappedBy = "customer")
    private List<BankAccount> bankAccounts;
}

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 4)
public abstract class BankAccount {
    @Id
    private String id;
    private double balance;
    private Date createdAt;
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    @ManyToOne
    private Customer customer;
    @OneToMany(mappedBy = "bankAccount")
    private List<AccountOperation> accountOperations;
}
```

This model implements several enterprise patterns:

- **Entity Relationship Mapping**: Proper JPA annotations ensure referential integrity
- **Inheritance Hierarchy**: Abstract base class with concrete implementations for different account types
- **Enumeration Types**: Type-safe representation of account statuses and operation types
- **Bidirectional Relationships**: Maintained through proper mapping configuration

### 3.2 Data Transfer Object Pattern

The application implements the DTO pattern to decouple the internal domain model from external API representations:

```java
@Data
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
}

@Data
public abstract class BankAccountDTO {
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private String type;
}
```

This pattern provides several architectural benefits:

- **API Versioning**: Independent evolution of internal and external data structures
- **Security**: Prevention of sensitive data exposure
- **Performance**: Optimized data transfer with minimal payload size
- **Maintainability**: Reduced coupling between layers

### 3.3 Service Layer Implementation

The service layer encapsulates business logic and coordinates between the presentation and data access layers:

```java
@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class BankAccountServiceImpl implements BankAccountService {
    private CustomerRepository customerRepository;
    private BankAccountRepository bankAccountRepository;
    private AccountOperationRepository accountOperationRepository;
    private BankAccountMapper bankAccountMapper;

    @Override
    public void debit(String accountId, double amount, String description) 
            throws BankAccountNotFoundException, BalanceNotSufficientException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found"));
        
        if (bankAccount.getBalance() < amount) {
            throw new BalanceNotSufficientException("Balance not sufficient");
        }
        
        AccountOperation accountOperation = new AccountOperation();
        accountOperation.setType(OperationType.DEBIT);
        accountOperation.setAmount(amount);
        accountOperation.setDescription(description);
        accountOperation.setOperationDate(new Date());
        accountOperation.setBankAccount(bankAccount);
        accountOperationRepository.save(accountOperation);
        
        bankAccount.setBalance(bankAccount.getBalance() - amount);
        bankAccountRepository.save(bankAccount);
    }
}
```

Key architectural considerations include:

- **Transaction Management**: `@Transactional` annotation ensures ACID properties
- **Exception Handling**: Domain-specific exceptions for business rule violations
- **Dependency Injection**: Constructor-based injection for improved testability
- **Logging**: Structured logging for operational monitoring

### 3.4 REST API Design

The application exposes RESTful endpoints following industry standards:

```java
@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
public class BankAccountRestAPI {
    private BankAccountService bankAccountService;

    @GetMapping("/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) 
            throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }
    
    @PostMapping("/debit")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) 
            throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(), 
                                    debitDTO.getAmount(), 
                                    debitDTO.getDescription());
        return debitDTO;
    }
}
```

The REST API implementation adheres to the following principles:

- **HTTP Semantics**: Appropriate use of HTTP methods and status codes
- **Resource-Based URLs**: Logical resource hierarchy in endpoint structure
- **Content Negotiation**: JSON-based request/response handling
- **Security Integration**: Method-level authorization controls

### 3.5 Security Architecture

The security implementation utilizes modern authentication and authorization mechanisms:

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig {
    private RsaKeyProperties rsaKeys;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(ar -> ar.requestMatchers("/auth/**").permitAll())
                .authorizeHttpRequests(ar -> ar.anyRequest().authenticated())
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(Customizer.withDefaults())
                .build();
    }
}
```

Security features include:

- **Stateless Authentication**: JWT-based token authentication
- **Role-Based Access Control**: Method-level security annotations
- **Asymmetric Cryptography**: RSA key pairs for token signing
- **Password Security**: BCrypt hashing for credential storage

## 4. Frontend Implementation

### 4.1 Component Architecture

The Angular frontend implements a component-based architecture with clear separation of concerns:

```typescript
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> = [];
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  totalPages: number = 0;
  
  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              public authService: AuthService) {}
              
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleGetPageCustomers();
  }
}
```

### 4.2 Service Layer Design

Angular services manage data access and state management:

```typescript
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  
  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${environment.backendHost}/customers`);
  }
  
  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.backendHost}/customers`, customer);
  }
}
```

### 4.3 Authentication Management

Client-side authentication is managed through a dedicated service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken: string = '';
  private roles: Array<any> = [];
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/auth/login`, {
      username, password
    }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(error => {
        this.isAuthenticated = false;
        return throwError(() => new Error(error.message));
      })
    );
  }
}
```

### 4.4 HTTP Interceptor Implementation

Global HTTP request processing is handled through interceptors:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/auth/login')) {
      const token = this.authService.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      })
    );
  }
}
```

## 5. Application Interface Documentation

### 5.1 Authentication Interface

The login interface provides secure user authentication with form validation and error handling.

![image](https://github.com/user-attachments/assets/c57aec50-b49c-4569-96fd-581f82ec519e)


*Figure 5.1: User Authentication Interface*

### 5.2 Administrative Dashboard

The dashboard presents key performance indicators and system metrics in an organized layout.

![image](https://github.com/user-attachments/assets/731b4c14-8ecc-4651-a062-24546188b0df)


*Figure 5.2: Administrative Dashboard Interface*

### 5.3 Customer Management Interface

The customer management interface enables comprehensive CRUD operations with search and pagination capabilities.

![image](https://github.com/user-attachments/assets/eaba1639-6e71-4b94-9fed-c4ea168f5b15)


*Figure 5.3: Customer Management Interface*

### 5.4 Customer Registration Form

The customer registration form implements validation and provides feedback for data entry operations.

![image](https://github.com/user-attachments/assets/b0bdca43-ee47-4bb0-a9d0-9b399b3f3244)


*Figure 5.4: Customer Registration Interface*

### 5.5 Customer Profile Management

The customer profile interface allows for modification of existing customer information.

![image](https://github.com/user-attachments/assets/eea2eea3-f9cb-4055-8f15-15e1b9c9873d)


*Figure 5.5: Customer Profile Management Interface*

### 5.6 Account Management Dashboard

This interface displays customer details alongside associated accounts and available operations.

![image](https://github.com/user-attachments/assets/eea2eea3-f9cb-4055-8f15-15e1b9c9873d)


*Figure 5.6: Account Management Dashboard*

### 5.7 Current Account Creation

The current account creation form enables administrators to establish new current accounts with overdraft capabilities.

![image](https://github.com/user-attachments/assets/b77f1a93-d1f1-45f2-8263-f65ed3536be3)



*Figure 5.7: Current Account Creation Interface*

### 5.8 Savings Account Creation

The savings account creation form facilitates the establishment of interest-bearing savings accounts.

![image](https://github.com/user-attachments/assets/c588355d-c745-4c57-ac9e-cf58cba9a5c4)



*Figure 5.8: Savings Account Creation Interface*

### 5.9 Credit Transaction Interface

The credit transaction modal provides secure fund deposit functionality with validation.

![image](https://github.com/user-attachments/assets/3fc49277-8992-46ad-baa8-cec653566a2f)


*Figure 5.9: Credit Transaction Interface*

### 5.10 Debit Transaction Interface

The debit transaction modal enables secure fund withdrawal with balance verification.

![image](https://github.com/user-attachments/assets/e5c4c90e-8250-4140-a320-beda6d6a5a0e)


*Figure 5.10: Debit Transaction Interface*

### 5.11 Transfer Transaction Interface

The transfer interface facilitates secure inter-account fund transfers with comprehensive validation.

![image](https://github.com/user-attachments/assets/dbe9c7bc-e25b-4988-952f-8b2dbbe462aa)


*Figure 5.11: Transfer Transaction Interface*

### 5.12 Account Search and Operations

This interface provides account search capabilities and transaction execution functionality.

![image](https://github.com/user-attachments/assets/3f4c552f-5c7c-45d2-8e64-13d04a7ffd8a)


*Figure 5.12: Account Search and Operations Interface*

### 5.13 User Profile Management

The user profile interface displays current user information and account details.

![image](https://github.com/user-attachments/assets/eea2eea3-f9cb-4055-8f15-15e1b9c9873d)

*Figure 5.13: User Profile Management Interface*

### 5.14 Password Management Interface

The password change interface implements secure password modification with validation requirements.

![image](https://github.com/user-attachments/assets/f63f685f-f153-4e18-bdcc-34514519294b)


*Figure 5.14: Password Management Interface*

## 6. System Architecture Overview

### 6.1 Project Structure

The application maintains a clear separation between backend and frontend components:

```
digital-banking/
├── backend/                     # Spring Boot Backend Application
│   ├── src/main/java/ma/enset/digitalbanking/
│   │   ├── controllers/         # REST API endpoint controllers
│   │   ├── dtos/               # Data Transfer Object definitions
│   │   ├── entities/           # JPA entity model classes
│   │   ├── enums/              # Enumeration type definitions
│   │   ├── exceptions/         # Custom exception implementations
│   │   ├── mappers/            # Entity-DTO mapping utilities
│   │   ├── repositories/       # Spring Data JPA repositories
│   │   ├── security/           # Security configuration components
│   │   └── services/           # Business logic service implementations
│   └── src/main/resources/     # Application configuration files
│
├── frontend/                   # Angular Frontend Application
│   ├── src/app/
│   └── src/assets/             # Static resource assets
│
└── documentation/              # Project documentation artifacts
```

## 7. Deployment and Configuration

### 7.1 Backend Deployment

The Spring Boot backend requires the following system prerequisites:

**System Requirements:**
- Java Development Kit (JDK) 17 or higher
- MariaDB Database Server (version 10.6 or higher)
- Maven Build Tool (version 3.8 or higher)

**Deployment Process:**

1. Database Configuration:
   ```sql
   CREATE DATABASE digital_banking;
   CREATE USER 'banking_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON digital_banking.* TO 'banking_user'@'localhost';
   ```

2. Application Properties Configuration:
   ```properties
   spring.datasource.url=jdbc:mariadb://localhost:3306/digital_banking
   spring.datasource.username=banking_user
   spring.datasource.password=secure_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Application Execution:
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

### 7.2 Frontend Deployment

The Angular frontend requires the following development environment:

**System Requirements:**
- Node.js (version 18 or higher)
- npm Package Manager (version 9 or higher)
- Angular CLI (version 19 or higher)

**Deployment Process:**

1. Dependency Installation:
   ```bash
   cd frontend
   npm install
   ```

2. Development Server Execution:
   ```bash
   ng serve --host 0.0.0.0 --port 4200
   ```

3. Production Build:
   ```bash
   ng build --configuration production
   ```

## 8. Testing and Quality Assurance

### 8.1 Testing Strategy

The application implements a comprehensive testing strategy encompassing:

- **Unit Testing**: Individual component and service testing
- **Integration Testing**: API endpoint and database integration verification
- **End-to-End Testing**: Complete user workflow validation
- **Security Testing**: Authentication and authorization mechanism verification

### 8.2 Code Quality Standards

The codebase adheres to established quality standards:

- **Coding Standards**: Java and TypeScript style guidelines
- **Documentation**: Comprehensive inline and external documentation
- **Error Handling**: Robust exception management and user feedback
- **Performance Optimization**: Efficient database queries and frontend rendering

## 9. Future Enhancements and Scalability

### 9.1 Proposed Enhancements

The system architecture supports the following potential enhancements:

1. **Advanced Banking Features**:
   - Scheduled transaction processing
   - Loan management systems
   - Investment portfolio tracking
   - Multi-currency support

2. **Technology Integration**:
   - Microservices architecture migration
   - Container orchestration with Kubernetes
   - Cloud-native deployment strategies
   - Real-time notification systems

3. **User Experience Improvements**:
   - Mobile application development
   - Progressive Web Application (PWA) implementation
   - Advanced analytics and reporting
   - Internationalization and localization

### 9.2 Scalability Considerations

The current architecture provides a foundation for horizontal and vertical scaling:

- **Database Scaling**: Read replica implementation and data partitioning
- **Application Scaling**: Load balancer integration and stateless service design
- **Frontend Optimization**: Content delivery network (CDN) integration
- **Performance Monitoring**: Application performance management (APM) tools

## 10. Conclusion

The Digital Banking Application successfully demonstrates the implementation of a comprehensive financial management system utilizing modern enterprise technologies and architectural patterns. The project achieves its primary objectives of delivering a secure, scalable, and maintainable banking platform suitable for production deployment.

### 10.1 Technical Achievements

The implementation demonstrates proficiency in:

- **Enterprise Architecture**: Proper layered architecture with clear separation of concerns
- **Security Implementation**: Modern authentication and authorization mechanisms
- **Database Design**: Efficient relational database schema with proper normalization
- **API Development**: RESTful service design following industry best practices
- **Frontend Development**: Responsive, user-friendly interface with modern frameworks
- **Quality Assurance**: Comprehensive error handling and validation mechanisms

### 10.2 Educational Outcomes

This project serves as a comprehensive demonstration of:

- Java Enterprise Edition (JEE) architecture principles
- Distributed systems design and implementation
- Modern web development frameworks and technologies
- Software engineering best practices and design patterns
- Database design and optimization techniques
- Security architecture and implementation strategies

The Digital Banking Application represents a professional-grade software solution that addresses real-world banking system requirements while maintaining high standards of code quality, security, and user experience.

---

**Document Information:**
- **Version**: 1.0
- **Date**: June 2025
- **Institution**: ENSET (École Nationale Supérieure d'Enseignants Techniques)
- **Course**: Architecture JEE and Distributed Systems
- **Classification**: Technical Documentation
