
# NestJS Fundamentals – Detailed Interview Guide (With Why, How, When)

This document provides **in-depth explanations** of **NestJS fundamentals**, covering **what, why, how, and when** each concept is used.  
Ideal for **beginners, intermediate developers, and interview preparation**.

---

## 1. What is NestJS and Why Is It Used?

### What is NestJS?
NestJS is a **progressive Node.js framework** for building **scalable, maintainable, and enterprise-grade backend applications**.  
It is built on top of **Express.js or Fastify** and heavily inspired by **Angular’s architecture**.

### Why is NestJS Used?
- Enforces **structured architecture**
- Built-in **Dependency Injection**
- Excellent support for **TypeScript**
- Easy to scale large applications
- First-class support for **microservices, GraphQL, WebSockets**

### When to Use NestJS?
- Large or growing codebases
- Enterprise or team-based projects
- APIs with complex business logic
- Microservices-based systems

---

## 2. What Are the Main Building Blocks of NestJS?

NestJS applications are composed of the following core building blocks:

- **Modules**
- **Controllers**
- **Providers**
- **Dependency Injection Container**

These work together to create a **loosely coupled, testable architecture**.

---

## 3. What is a Module in NestJS?

### What is a Module?
A module is a **logical boundary** that groups related components like controllers and providers.

```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Why Modules?
- Organize code
- Improve maintainability
- Enable dependency scoping
- Support lazy loading

### When to Create a Module?
- When adding a new domain or feature
- To isolate functionality
- To reuse logic across applications

---

## 4. What is a Controller?

### What is a Controller?
A controller handles **incoming HTTP requests** and returns responses to the client.

```ts
@Controller('users')
export class UserController {
  @Get()
  findAll() {
    return 'All users';
  }
}
```

### Why Controllers?
- Separate request handling from business logic
- Improve readability
- Enable routing via decorators

### When to Use Controllers?
- Whenever you expose an API endpoint
- To map routes to business logic

---

## 5. What is a Provider?

### What is a Provider?
A provider is a **class that contains business logic** and can be injected into other components.

```ts
@Injectable()
export class UserService {
  findUsers() {
    return [];
  }
}
```

### Why Providers?
- Promote code reuse
- Support dependency injection
- Improve testability

### When to Use Providers?
- For business logic
- Database access
- Utility services

---

## 6. What is Dependency Injection in NestJS?

### What is Dependency Injection (DI)?
DI is a design pattern where dependencies are **provided by the framework** instead of being created manually.

```ts
constructor(private readonly userService: UserService) {}
```

### Why DI?
- Loose coupling
- Easier testing
- Better maintainability

### How DI Works in NestJS?
- Providers are registered in modules
- NestJS DI container resolves dependencies
- Instances are injected automatically

---

## 7. Difference Between NestJS and Express.js

| NestJS | Express.js |
|------|-----------|
| Opinionated | Unopinionated |
| Built-in DI | No DI |
| Modular architecture | Minimal structure |
| Enterprise-ready | Lightweight |
| TypeScript-first | JS-first |

### When to Choose Which?
- **NestJS** → large, scalable applications
- **Express** → small services or quick APIs

---

## 8. What is `main.ts` in NestJS?

### What is `main.ts`?
`main.ts` is the **entry point** of a NestJS application.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### Why is it Important?
- Bootstraps the app
- Configures global middleware, pipes, filters
- Starts the HTTP server

### When to Modify `main.ts`?
- Adding global validation pipes
- Enabling CORS
- Setting up global interceptors

---

## 9. What Decorators Are Commonly Used in Controllers?

### Controller-Level Decorators
- `@Controller()`
- `@Get()`
- `@Post()`
- `@Put()`
- `@Delete()`

### Parameter Decorators
- `@Param()`
- `@Query()`
- `@Body()`
- `@Headers()`

### Example
```ts
@Get(':id')
getUser(@Param('id') id: string) {
  return id;
}
```

### Why Decorators?
- Declarative syntax
- Cleaner code
- Metadata-driven routing

---

## Interview-Ready Summary

- NestJS provides **structure on top of Node.js**
- Modules organize the application
- Controllers handle requests
- Providers contain business logic
- Dependency Injection improves maintainability
- Decorators simplify routing and metadata handling

---

## Conclusion

Understanding these NestJS fundamentals is **essential** before moving to advanced topics like **guards, interceptors, microservices, and performance optimization**.  
These concepts form the **foundation of scalable NestJS applications**.
