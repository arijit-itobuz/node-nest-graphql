# App

- node
- nest
- graphql
- prisma
- postgres

---

# Nest

- nest g module <module_name>
- nest g resource <resource_name>
- nest g controller <controller_name>
- nest g service <service_name>

---

# Prisma

- npx prisma generate
- npx prisma migrate dev --name <migration_name>
- npx prisma db push
- npx prisma studio

---

# Build

### SWC

##### Dependencies

- @swc/cli
- @swc/core

### NCC

##### Dependencies

- @vercel/ncc

### Prisma

- build > bundling > ./node_modules/.prisma/client/<os_specific_node_files>
- after building and bundling you code, you need to have the .node files which are platform independent files which prisma requires to run.
- copy those files and put it in the root directory where you root.js file is generated, in this case the file is index.js.

---

# Nest - usefull links

- https://stackoverflow.com/questions/74548546/what-is-the-difference-between-inputtype-and-objecttype-in-nestjs
