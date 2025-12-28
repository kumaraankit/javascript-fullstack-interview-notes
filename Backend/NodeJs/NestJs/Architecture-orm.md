
# NestJS Architecture & ORM Deep Dive – Circular Dependencies, Scalability & TypeORM/Prisma

This document explains **WHAT, WHY, HOW, and WHEN** for **advanced NestJS architecture and ORM concepts**.
It is aimed at **senior backend engineers and interview preparation**.

---

## 1. How Does NestJS Handle Circular Dependencies?

### WHAT
A circular dependency occurs when two providers depend on each other directly or indirectly.

### WHY It Happens
- Tight coupling
- Poor module boundaries
- Bidirectional relationships

### HOW NestJS Handles It
NestJS provides `forwardRef()` to lazily resolve dependencies.

```ts
@Module({
  imports: [forwardRef(() => UserModule)],
})
export class AuthModule {}
```

```ts
constructor(
  @Inject(forwardRef(() => UserService))
  private userService: UserService,
) {}
```

### WHEN to Use `forwardRef`
- When refactoring is not feasible
- Legacy or complex domains

⚠️ Prefer redesign over frequent use.

---

## 2. How to Design Scalable NestJS Applications?

### WHY Scalability Matters
- Growing codebases
- Increasing traffic
- Multiple teams

### KEY PRINCIPLES
- Feature-based modules
- Clear boundaries
- Stateless services
- Async communication
- Shared core modules

### HOW
- Domain-driven design (DDD)
- Separate API, service, and infrastructure layers
- Avoid global state

### WHEN
- Medium to large applications
- Microservices architectures

---

## 3. What is an ORM?

### WHAT
ORM (Object Relational Mapper) maps database tables to application objects.

### WHY
- Faster development
- Less boilerplate SQL
- Type safety

### WHEN
- CRUD-heavy applications
- Rapid development cycles

---

## 4. How Does NestJS Integrate with TypeORM and Prisma?

### TypeORM Integration
```ts
TypeOrmModule.forRoot();
TypeOrmModule.forFeature([User]);
```

### Prisma Integration
- Prisma Client injected as provider
- Schema-driven

### WHY NestJS Supports Both
- TypeORM → flexibility
- Prisma → type safety & performance

---

## 5. TypeORM vs Prisma in NestJS

| Feature | TypeORM | Prisma |
|------|--------|-------|
| Maturity | Older | Newer |
| Active Record | Yes | No |
| Type Safety | Medium | Strong |
| Performance | Moderate | Better |
| Migrations | CLI-based | Schema-based |

### WHEN to Choose
- TypeORM → complex relations, legacy DBs
- Prisma → modern apps, type safety

---

## 6. What are Entities and Repositories in TypeORM?

### Entities
```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
}
```

### Repositories
```ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
}
```

### WHY
- Separation of concerns
- Clean persistence layer

---

## 7. How Do Relations Work in TypeORM?

### One-to-One
```ts
@OneToOne(() => Profile)
```

### One-to-Many / Many-to-One
```ts
@ManyToOne(() => User)
```

### Many-to-Many
```ts
@ManyToMany(() => Role)
```

### WHY
- Represent real-world relationships

---

## 8. Eager vs Lazy Loading

### Eager Loading
```ts
@ManyToOne(() => User, { eager: true })
```

### Lazy Loading
```ts
@ManyToOne(() => User)
user.profile;
```

| Eager | Lazy |
|-----|------|
| Simpler | More control |
| Extra queries | Optimized |

### WHEN
- Eager → small datasets
- Lazy → large relations

---

## Interview-Ready Summary

- Circular dependencies should be minimized
- `forwardRef` is a workaround, not a design
- Scalability comes from clear boundaries
- ORM simplifies DB access
- Prisma offers stronger type safety
- Relations should be carefully designed
- Lazy loading helps avoid performance issues

---

## Conclusion
Mastering these concepts ensures you can design **clean, scalable, and maintainable NestJS applications** and confidently answer **advanced interview questions**.
