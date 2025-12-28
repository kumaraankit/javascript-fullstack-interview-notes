
# NestJS Tooling, Security, Caching & Testing – Deep Dive (With WHY, HOW, WHEN)

This document covers **advanced and practical NestJS topics** that are frequently asked in **senior backend interviews** and heavily used in **real-world applications**.

---

## 1. What is Nest CLI and How Is It Used?

### WHAT
Nest CLI is a **command-line tool** that helps scaffold, build, and manage NestJS applications.

### HOW
```bash
npm i -g @nestjs/cli
nest new my-app
nest g module users
nest g controller users
nest g service users
```

### WHY
- Enforces best practices
- Saves time
- Generates consistent boilerplate

### WHEN
- Starting new projects
- Generating modules, controllers, services

---

## 2. What is a Dynamic Module?

### WHAT
A dynamic module allows modules to be **configured at runtime**.

### HOW
```ts
@Module({})
export class DatabaseModule {
  static forRoot(config): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [{ provide: 'DB_CONFIG', useValue: config }],
      exports: ['DB_CONFIG'],
    };
  }
}
```

### WHY
- Environment-based configuration
- Reusable libraries

### WHEN
- Config modules
- Database modules

---

## 3. Lifecycle Hooks in NestJS

### WHAT
Lifecycle hooks allow you to run logic during app/module lifecycle.

### COMMON HOOKS
- `OnModuleInit`
- `OnModuleDestroy`
- `BeforeApplicationShutdown`

### HOW
```ts
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('Initialized');
  }
}
```

### WHEN
- DB connections
- Cleanup tasks

---

## 4. Authentication in NestJS (JWT + Passport)

### HOW
- Use `@nestjs/passport`
- Implement strategies
- Protect routes with guards

```ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {}
```

### WHY
- Secure APIs
- Industry standard

### WHEN
- Any authenticated system

---

## 5. AuthGuard vs Custom Guards

| AuthGuard | Custom Guard |
|---------|-------------|
| Strategy-based | Business logic |
| Passport integrated | Flexible |

### WHEN
- AuthGuard → authentication
- Custom guard → RBAC / permissions

---

## 6. Caching in NestJS

### WHAT
Caching stores frequently accessed data.

### HOW
```ts
CacheModule.register();
```

### WHY
- Reduce DB calls
- Improve response time

---

## 7. CacheInterceptor & Redis

### HOW
```ts
@UseInterceptors(CacheInterceptor)
@Get()
findAll() {}
```

```ts
CacheModule.register({ store: redisStore });
```

### WHEN
- Read-heavy APIs

---

## 8. Unit Testing in NestJS

### WHAT
Testing individual components in isolation.

### HOW
```ts
Test.createTestingModule({
  providers: [UserService],
});
```

### WHY
- Catch bugs early
- Safe refactoring

---

## 9. Mocking Providers in Tests

### HOW
```ts
{
  provide: UserService,
  useValue: { findAll: jest.fn() },
}
```

### WHY
- Isolate logic
- Faster tests

---

## 10. End-to-End (E2E) Testing in NestJS

### HOW
```ts
const app = moduleFixture.createNestApplication();
```

```ts
request(app.getHttpServer()).get('/users');
```

### WHY
- Validate full request flow

### WHEN
- Critical APIs
- Regression testing

---

## Interview-Ready Summary

- Nest CLI accelerates development
- Dynamic modules enable runtime config
- Lifecycle hooks manage resources
- JWT + Passport is standard auth
- Caching boosts performance
- Testing is first-class in NestJS

---

## Conclusion
These concepts demonstrate **production-level NestJS expertise** and are **essential for senior backend and NestJS interviews**.
