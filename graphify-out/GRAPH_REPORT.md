# Graph Report - .  (2026-06-25)

## Corpus Check
- Corpus is ~8,810 words - fits in a single context window. You may not need a graph.

## Summary
- 432 nodes · 656 edges · 29 communities (20 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_User DTOs|User DTOs]]
- [[_COMMUNITY_Auth Controller Service|Auth Controller Service]]
- [[_COMMUNITY_Auth Database Wiring|Auth Database Wiring]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Access Guards Recaptcha|Access Guards Recaptcha]]
- [[_COMMUNITY_Package Test Config|Package Test Config]]
- [[_COMMUNITY_Agent Working Rules|Agent Working Rules]]
- [[_COMMUNITY_Auth Errors Common|Auth Errors Common]]
- [[_COMMUNITY_Dev Tooling Dependencies|Dev Tooling Dependencies]]
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_App Filters Pipes|App Filters Pipes]]
- [[_COMMUNITY_R2 Storage Uploads|R2 Storage Uploads]]
- [[_COMMUNITY_README Commands|README Commands]]
- [[_COMMUNITY_Environment Config|Environment Config]]
- [[_COMMUNITY_OpenAI Invoice Extraction|OpenAI Invoice Extraction]]
- [[_COMMUNITY_App Starter Service|App Starter Service]]
- [[_COMMUNITY_Nest CLI Config|Nest CLI Config]]
- [[_COMMUNITY_Initial Migration|Initial Migration]]
- [[_COMMUNITY_File Claim Types|File Claim Types]]
- [[_COMMUNITY_Multipart Request DTO|Multipart Request DTO]]
- [[_COMMUNITY_File Upload Interceptor|File Upload Interceptor]]
- [[_COMMUNITY_Build TS Config|Build TS Config]]
- [[_COMMUNITY_Uploaded File Types|Uploaded File Types]]
- [[_COMMUNITY_Base Error DTO|Base Error DTO]]
- [[_COMMUNITY_Body Token DTO|Body Token DTO]]
- [[_COMMUNITY_Express Request Types|Express Request Types]]

## God Nodes (most connected - your core abstractions)
1. `UsersService` - 23 edges
2. `AuthService` - 20 edges
3. `UsersRepository` - 19 edges
4. `compilerOptions` - 18 edges
5. `ErrorCodes` - 16 edges
6. `scripts` - 15 edges
7. `UsersController` - 13 edges
8. `Users` - 10 edges
9. `jest` - 8 edges
10. `AppException` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Verify Before Reporting Done` --semantically_similar_to--> `Testing`  [INFERRED] [semantically similar]
  AGENTS.md → README.md
- `Verify Before Reporting Done` --semantically_similar_to--> `Testing`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Codex Working Rules` --semantically_similar_to--> `Claude Working Rules`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `Workflow Before Making Any Changes` --semantically_similar_to--> `Workflow Before Making Any Changes`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `General Principles` --semantically_similar_to--> `General Principles`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Agent Change Control Rules** — agents_workflow_before_making_changes, agents_general_principles, claude_workflow_before_making_changes, claude_general_principles [INFERRED 0.95]
- **Project Command Workflow** — readme_installation, readme_running_the_app, readme_testing, readme_migration, readme_endpoint_generation [EXTRACTED 1.00]
- **Verification Practice** — agents_verify_before_reporting_done, claude_verify_before_reporting_done, readme_testing [INFERRED 0.75]

## Communities (29 total, 9 thin omitted)

### Community 0 - "User DTOs"
Cohesion: 0.07
Nodes (18): Roles(), ChangePasswordDto, RegisterDto, AppraiserFilter, GetAllAppraisersDto, GetRegisterUsers, RestorePasswordDto, UpdateUserDto (+10 more)

### Community 1 - "Auth Controller Service"
Cohesion: 0.08
Nodes (16): AuthController, AuthService, AppleJwtDecode, AuthInfo, GeneratedTokens, GoogleProfile, JwtPayload, LoginAdminDto (+8 more)

### Community 2 - "Auth Database Wiring"
Cohesion: 0.11
Nodes (11): AuthModule, Roles, Users, RolesRepository, UsersRepository, MailService, NodemailerService, providers (+3 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, bcrypt, class-transformer, class-validator, cross-env, dotenv (+29 more)

### Community 4 - "Access Guards Recaptcha"
Cohesion: 0.08
Nodes (10): RecaptchaAction(), UserAccessGuard, JwtAuthGuard, HardCodeGuard, RecaptchaGuard, RolesGuard, RecaptchaController, RecaptchaModule (+2 more)

### Community 5 - "Package Test Config"
Cohesion: 0.06
Nodes (30): author, description, jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment (+22 more)

### Community 6 - "Agent Working Rules"
Cohesion: 0.07
Nodes (30): Analyze Request, Ask For Clarification, Codex Working Rules, Execute After Approval, General Principles, Minimal Scope, No Comments By Default, No Speculative Features (+22 more)

### Community 7 - "Auth Errors Common"
Cohesion: 0.15
Nodes (11): IAdmin, AppException, BadRequestAppException, ConflictAppException, ForbiddenAppException, NotFoundAppException, UnauthorizedAppException, ErrorCodes (+3 more)

### Community 8 - "Dev Tooling Dependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+15 more)

### Community 9 - "TypeScript Compiler Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental, module (+12 more)

### Community 10 - "App Filters Pipes"
Cohesion: 0.21
Nodes (4): GlobalExceptionFilter, ResponseInterseptor, ValidationPipe, BaseResponse

### Community 11 - "R2 Storage Uploads"
Cohesion: 0.25
Nodes (4): r2Client, StorageModule, MulterFile, R2StorageService

### Community 12 - "README Commands"
Cohesion: 0.18
Nodes (11): Endpoint Generation, Installation, Migration, nest g resource --no-spec, npm install, npm run migration:generate:dev, npm run start, npm run start:dev (+3 more)

### Community 13 - "Environment Config"
Cohesion: 0.22
Nodes (8): data, db, gpt, jwt, r2, recaptcha, resend, smtp

### Community 14 - "OpenAI Invoice Extraction"
Cohesion: 0.28
Nodes (4): InvoiceExtractionResult, InvoiceExtractionSchema, OpenAiInvoiceExtractionService, OpenAiModule

### Community 16 - "Nest CLI Config"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 18 - "File Claim Types"
Cohesion: 0.50
Nodes (3): ClaimFile, IFile, IFilesData

## Knowledge Gaps
- **153 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UsersService` connect `User DTOs` to `Auth Controller Service`, `Auth Database Wiring`, `Auth Errors Common`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Test Config`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `AuthService` connect `Auth Controller Service` to `Auth Database Wiring`, `Auth Errors Common`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _171 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User DTOs` be split into smaller, more focused modules?**
  _Cohesion score 0.06988120195667366 - nodes in this community are weakly interconnected._
- **Should `Auth Controller Service` be split into smaller, more focused modules?**
  _Cohesion score 0.0796221322537112 - nodes in this community are weakly interconnected._
- **Should `Auth Database Wiring` be split into smaller, more focused modules?**
  _Cohesion score 0.10960960960960961 - nodes in this community are weakly interconnected._