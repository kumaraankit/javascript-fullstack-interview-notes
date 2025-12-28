
# NestJS Core Concepts – Routing, Pipes, Guards, Interceptors & Validation

This document explains **WHAT, WHY, HOW, and WHEN** for important **NestJS intermediate concepts**.  
It is designed for **interview preparation** and **real-world backend development**.

---

## 1. How Do You Handle Routes in NestJS?

### WHAT
Routing in NestJS is handled using **controllers and decorators** instead of manual route definitions.

### HOW
```ts
@Controller('users')
export class UserController {
  @Get()
  findAll() {
    return 'All users';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }
}
```

### WHY
- Declarative routing
- Cleaner code
- Easy to read & maintain

### WHEN
- Every HTTP endpoint in a NestJS app

---

## 2. Purpose of `@Injectable()` Decorator

### WHAT
Marks a class as a **provider** that can be managed by NestJS DI container.

### HOW
```ts
@Injectable()
export class UserService {}
```

### WHY
- Enables dependency injection
- Allows lifecycle management

### WHEN
- Any service, repository, helper class

---

## 3. Lifecycle of a Request in NestJS

### FLOW
1. Middleware
2. Guards
3. Interceptors (before)
4. Pipes
5. Controller
6. Service
7. Interceptors (after)
8. Exception filters

### WHY
- Clear separation of concerns
- Better control over request handling

---

## 4. Pipes and Their Use Cases

### WHAT
Pipes transform and validate incoming data.

### HOW
```ts
@Param('id', ParseIntPipe) id: number
```

### USE CASES
- Validation
- Type transformation
- Data sanitization

### WHEN
- Validating request payloads

---

## 5. Guards vs Middleware

| Middleware | Guards |
|----------|-------|
| Runs before routing | Runs after routing |
| No access to handler | Knows route metadata |
| Used for logging | Used for auth |

### WHEN
- Middleware → logging, CORS
- Guards → authentication & authorization

---

## 6. Interceptors in NestJS

### WHAT
Interceptors wrap method execution.

### HOW
```ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context, next) {
    return next.handle();
  }
}
```

### WHY
- Logging
- Response transformation
- Performance tracking

---

## 7. Exception Handling in NestJS

### HOW
```ts
throw new BadRequestException('Invalid input');
```

### GLOBAL FILTER
```ts
@Catch()
export class GlobalExceptionFilter {}
```

### WHY
- Centralized error handling
- Consistent API responses

---

## 8. DTO and Why It Is Important

### WHAT
DTO = Data Transfer Object

```ts
export class CreateUserDto {
  name: string;
}
```

### WHY
- Validation
- Type safety
- Clean API contracts

---

## 9. Validating Request Data in NestJS

### HOW
```ts
@UsePipes(new ValidationPipe())
```

```ts
export class CreateUserDto {
  @IsEmail()
  email: string;
}
```

### WHY
- Prevent invalid input
- Security

---

## 10. ConfigModule in NestJS

### WHAT
Manages environment-based configuration.

### HOW
```ts
ConfigModule.forRoot();
```

### WHY
- Centralized config
- Environment separation

---

## 11. Custom Decorators in NestJS

### WHAT
Create reusable metadata logic.

### HOW
```ts
export const User = createParamDecorator(
  (_, ctx) => ctx.switchToHttp().getRequest().user,
);
```

### WHY
- Cleaner controllers
- Reusability

---

## Interview-Ready Summary

- Routing is decorator-based
- Providers require `@Injectable`
- Request lifecycle is predictable
- Pipes validate and transform data
- Guards handle authorization
- Interceptors enhance execution flow
- DTOs ensure data integrity
- ConfigModule simplifies environment management
- Custom decorators improve code quality

---

## Conclusion
These concepts are **core to NestJS** and are heavily tested in **mid-to-senior backend interviews**.  
Mastering them ensures you can build **clean, scalable, and secure NestJS applications**.
