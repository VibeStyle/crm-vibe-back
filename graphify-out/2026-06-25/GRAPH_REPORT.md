# Graph Report - crm-vibe-back  (2026-06-25)

## Corpus Check
- 104 files · ~20,252 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 569 nodes · 878 edges · 40 communities (27 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `274724bc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]

## God Nodes (most connected - your core abstractions)
1. `UsersService` - 23 edges
2. `AuthService` - 20 edges
3. `UsersRepository` - 19 edges
4. `compilerOptions` - 18 edges
5. `ErrorCodes` - 17 edges
6. `ProjectsService` - 17 edges
7. `scripts` - 15 edges
8. `UsersController` - 13 edges
9. `What You Must Do When Invoked` - 12 edges
10. `TagCategory` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Verify Before Reporting Done` --semantically_similar_to--> `Testing`  [INFERRED] [semantically similar]
  AGENTS.md → README.md
- `Verify Before Reporting Done` --semantically_similar_to--> `Testing`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Codex Working Rules` --semantically_similar_to--> `Claude Working Rules`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `General Principles` --semantically_similar_to--> `General Principles`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `Workflow Before Making Any Changes` --semantically_similar_to--> `Workflow Before Making Any Changes`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Agent Change Control Rules** — agents_workflow_before_making_changes, agents_general_principles, claude_workflow_before_making_changes, claude_general_principles [INFERRED 0.95]
- **Project Command Workflow** — readme_installation, readme_running_the_app, readme_testing, readme_migration, readme_endpoint_generation [EXTRACTED 1.00]
- **Verification Practice** — agents_verify_before_reporting_done, claude_verify_before_reporting_done, readme_testing [INFERRED 0.75]

## Communities (40 total, 13 thin omitted)

### Community 0 - "User DTOs"
Cohesion: 0.07
Nodes (16): Roles(), ChangePasswordDto, RegisterDto, AppraiserFilter, GetAllAppraisersDto, GetRegisterUsers, RestorePasswordDto, UpdateUserDto (+8 more)

### Community 1 - "Auth Controller Service"
Cohesion: 0.08
Nodes (17): AuthController, AuthService, AppleJwtDecode, AuthInfo, GeneratedTokens, GoogleProfile, JwtPayload, LoginAdminDto (+9 more)

### Community 2 - "Auth Database Wiring"
Cohesion: 0.09
Nodes (15): GetProjectsDto, GetProjectTagsDto, CreateProjectDto, UpdateProjectDto, CreateTagDto, UpdateTagDto, Project, Tag (+7 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, bcrypt, class-transformer, class-validator, cross-env, dotenv (+29 more)

### Community 4 - "Access Guards Recaptcha"
Cohesion: 0.09
Nodes (9): UserAccessGuard, JwtAuthGuard, HardCodeGuard, RecaptchaGuard, RolesGuard, RecaptchaController, RecaptchaModule, RecaptchaService (+1 more)

### Community 5 - "Package Test Config"
Cohesion: 0.06
Nodes (30): author, description, jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment (+22 more)

### Community 6 - "Agent Working Rules"
Cohesion: 0.05
Nodes (44): 1. Analyze the Request, 2. Ask for Clarification (if needed), 3. Present an Implementation Plan, 4. Wait for Approval, 5. Execute, Analyze Request, API Documentation, Ask For Clarification (+36 more)

### Community 7 - "Auth Errors Common"
Cohesion: 0.16
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
Cohesion: 0.16
Nodes (13): Endpoint, Endpoint Generation, Installation, Migration, nest g resource --no-spec, npm install, npm run migration:generate:dev, npm run start (+5 more)

### Community 13 - "Environment Config"
Cohesion: 0.08
Nodes (15): AuthModule, InvoiceExtractionResult, InvoiceExtractionSchema, OpenAiInvoiceExtractionService, OpenAiModule, ProjectsModule, RolesRepository, MailService (+7 more)

### Community 14 - "OpenAI Invoice Extraction"
Cohesion: 0.29
Nodes (3): Roles, Users, UsersRepository

### Community 16 - "Nest CLI Config"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 18 - "File Claim Types"
Cohesion: 0.50
Nodes (3): ClaimFile, IFile, IFilesData

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (8): data, db, gpt, jwt, r2, recaptcha, resend, smtp

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 35 - "Community 35"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 36 - "Community 36"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **209 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+204 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UsersService` connect `User DTOs` to `Auth Controller Service`, `Environment Config`, `Auth Errors Common`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AuthService` connect `Auth Controller Service` to `Environment Config`, `Auth Errors Common`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User DTOs` be split into smaller, more focused modules?**
  _Cohesion score 0.07358156028368794 - nodes in this community are weakly interconnected._
- **Should `Auth Controller Service` be split into smaller, more focused modules?**
  _Cohesion score 0.07560975609756097 - nodes in this community are weakly interconnected._
- **Should `Auth Database Wiring` be split into smaller, more focused modules?**
  _Cohesion score 0.09294199860237597 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._