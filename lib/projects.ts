export type Project = {
  slug: string;
  name: string;
  description: string;
  tagline: string;
  tag: string;
  tagColor: string;
  status: 'complete' | 'wip';
  stack: string;
  concepts: string;
  repo: string;
  live?: string;
  swagger?: string;
  image?: string;
  content: {
    problem: string;
    priorArt: string;
    designDecisions: string;
    architecture: string;
    reflection: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'virtual-lab',
    name: 'Virtual Lab',
    image: '/projects/virtual-lab.webp',
    description:
      'Interactive computer science learning platform with 3D hardware simulations and browser-based programming exercises.',
    tagline:
      'Explore computer hardware in 3D and learn Python, JavaScript, and SQL through guided lessons and in-browser code execution.',
    tag: 'Next.js',
    tagColor: 'text-blue-400 bg-blue-400/10',
    status: 'complete',
    stack:
      'Next.js 16 · TypeScript · Three.js · React Three Fiber · Tailwind CSS · Zustand · Pyodide · sql.js',
    concepts:
      'Interactive 3D · WebAssembly · Client-side code execution · Computer architecture · REST APIs · i18n',
    repo: 'https://github.com/joss12/Virtual-Lab-web',
    live: 'https://virtual-lab-web.vercel.app',
    content: {
      problem: `Learning computer architecture and programming often requires switching between static diagrams, tutorials, and separate development environments. I wanted to create a virtual lab where students could explore hardware, visualize data flow, and practice programming without installing tools.`,

      priorArt: `Many coding platforms emphasize exercises without connecting them to the hardware beneath the software, while hardware tutorials often rely on static illustrations. Virtual Lab brings 3D component exploration, programming lessons, quizzes, and reference material together in one application.`,

      designDecisions: `I chose Next.js 16 and TypeScript for a maintainable application, Three.js with React Three Fiber for interactive 3D hardware, and lazy-loaded browser runtimes for programming exercises. Pyodide runs Python through WebAssembly, sql.js provides SQLite in the browser, and JavaScript exercises use a Function-based runner with captured console output. Zustand manages client state, next-intl supports English and French, and JWT authentication integrates with a separate REST API.`,

      architecture: `Localized Next.js App Router pages organize hardware study, the interactive 3D lab, quizzes, and programming tracks. Reusable React components present lessons and hardware visualizations; Markdown content powers guides and projects. A client-side execution layer supports Python, JavaScript, and SQL. Zustand manages local application state, while a separate REST API handles authentication and persistent progress and leaderboard data.`,

      reflection: `Building Virtual Lab helped me connect interactive graphics, frontend architecture, and multiple browser-based programming environments. Lazy-loading execution engines was important for reducing initial load. I would expand the guided projects and 3D simulations, optimize lower-powered devices, and strengthen isolation for untrusted JavaScript execution; a Function-based runner is not a secure sandbox.`,
    },
  },

  {
    slug: 'agora-ecommerce',
    name: 'Agora — Full-Stack E-Commerce Platform',
    image: '/projects/agora.webp',
    description:
      'A full-stack e-commerce platform built with Java Spring Boot and Next.js, featuring JWT authentication, product management, shopping carts, order processing, payment integration, shipment tracking, and an administrative dashboard.',
    tagline:
      'A production-deployed e-commerce platform powered by Java 21, Spring Boot, Next.js, and TypeScript — combining secure REST APIs, transactional order processing, inventory management, payment workflows, and shipment tracking.',
    tag: 'Java',
    tagColor: 'text-orange-400 bg-orange-400/10',
    status: 'complete',
    stack:
      'Java 21 · Spring Boot 4 · Spring Security · JWT · MySQL · Hibernate · JPA · Flyway · Redis · Next.js · React · TypeScript · Tailwind CSS · Cloudinary · Swagger/OpenAPI · Maven · Render · Vercel',
    concepts:
      'REST API design · Layered architecture · JWT authentication · Role-based authorization · Database transactions · Inventory consistency · Payment processing · Order lifecycle management · Shipment tracking · Redis caching · Database migrations · Integration testing · Cloud deployment',
    repo: 'https://github.com/joss12/agora-backend',
    live: 'https://agora-web-olive.vercel.app',
    swagger: 'https://agora-backend-qqkr.onrender.com/swagger-ui.html',
    content: {
      problem: `Building an e-commerce application involves much more than displaying products and processing checkout requests. A reliable platform must coordinate authentication, inventory, shopping carts, payments, orders, and shipments while maintaining data consistency across multiple operations.

      One of the main challenges is preventing inconsistent order states. For example, an order should not advance to processing without successful payment, inventory must be updated correctly when purchases occur, and cancellations must restore stock when appropriate.

      I built Agora to address these challenges through a complete full-stack application, with a Java Spring Boot backend responsible for business rules, security, persistence, and transaction management, and a Next.js frontend providing the customer shopping experience and administrative tools.`,

      priorArt: `Established e-commerce platforms such as Shopify, WooCommerce, and Magento provide comprehensive solutions for online stores. However, these platforms abstract away much of the underlying engineering involved in authentication, inventory management, payment processing, and order lifecycle coordination.

      I wanted to build these capabilities directly rather than rely on a ready-made commerce engine.

      Agora was designed as an independently developed application where I could implement and understand the complete workflow — from customer authentication and product discovery to checkout, administrative order processing, shipment creation, and delivery confirmation.

      This approach allowed me to focus on backend architecture, database consistency, API security, and integration between independently deployed frontend and backend applications.`,

      designDecisions: `I chose Java 21 and Spring Boot 4 for the backend because of their strong support for enterprise application development, dependency injection, security, transaction management, and relational persistence.

      Spring Security and JWT provide authentication and authorization, allowing customer and administrative operations to be protected according to their access requirements.

      MySQL was selected as the relational database, with Spring Data JPA and Hibernate handling persistence. Flyway manages versioned database migrations to keep schema changes organized and reproducible.

      I incorporated Redis and Spring Cache for caching infrastructure and Cloudinary for product image storage, keeping media management separate from the application's relational database.

      The frontend uses Next.js, React, TypeScript, and Tailwind CSS to deliver a responsive shopping experience and administrative dashboard.

      I separated the frontend and backend into independently deployed applications, using Vercel for the frontend and Render for the Java API.

      For payment handling, I implemented explicit payment states and persisted payment attempts. Demo payment simulation supports development and testing without requiring real financial transactions.

      Order processing follows defined business rules: payment status determines whether an order can advance, while cancellation and refund handling coordinate order state with inventory restoration.

      I also integrated Springdoc OpenAPI to document REST endpoints and used JUnit, Spring Boot Test, and Testcontainers to test backend workflows against realistic persistence behavior.`,

      architecture: `Agora follows a layered client-server architecture with independently deployed frontend and backend applications.

      Frontend — Next.js, React, and TypeScript provide product browsing, shopping cart interactions, checkout workflows, account functionality, and administrative interfaces.

      API Layer — Spring Boot REST controllers receive HTTP requests, validate inputs, and expose endpoints for authentication, products, orders, payments, shipments, and administrative operations.

      Security Layer — Spring Security and JWT protect authenticated routes and enforce authorization rules for sensitive operations.

      Service Layer — Business services coordinate application workflows, including product management, inventory updates, order creation, payment handling, cancellation, and shipment processing.

      Persistence Layer — Spring Data JPA and Hibernate manage entities and database operations against MySQL. Flyway handles database schema migrations.

      Payment Workflow — Payment services track payment status and attempts. Successful payments authorize eligible order transitions, while failed payments prevent unauthorized processing. Cancellation logic handles refund states according to the payment method and available transaction information.

      Shipment Workflow — Administrative users create shipments with carrier and tracking information. Shipment records track shipping and delivery states, with dedicated API operations for delivery confirmation.

      Supporting Infrastructure — Redis provides caching capabilities, Cloudinary manages product images, and Spring Mail supports email-related functionality.

      Testing — JUnit, Spring Boot Test, and Testcontainers support automated testing of business rules, persistence operations, payment behavior, and administrative workflows.

      Deployment — The Spring Boot backend runs on Render, while the Next.js frontend is deployed on Vercel. Swagger/OpenAPI provides interactive API documentation.

      Backend Repository: https://github.com/joss12/agora-backend

      Live Application: https://agora-web-olive.vercel.app

      API Documentation: https://agora-backend-qqkr.onrender.com/swagger-ui.html`,

      reflection: `Agora strengthened my understanding of the engineering challenges involved in building a complete transactional web application.

      The most important lesson was that implementing individual CRUD endpoints is relatively straightforward compared with coordinating business operations across authentication, inventory, payments, orders, and shipments.

      Payment handling required particular attention because payment success, payment failure, order processing, cancellation, and refund states must remain consistent.

      Integration testing also proved valuable. Testing real persistence behavior helped validate business rules that would be difficult to verify through isolated unit tests alone.

      Separating the frontend and backend improved my experience with API contracts, authentication across applications, deployment configuration, and production debugging.

      If I continued extending Agora, I would focus on payment webhook reconciliation, stronger idempotency guarantees for payment operations, improved observability, automated deployment pipelines, and more comprehensive end-to-end testing.

      Agora represents a practical demonstration of my ability to design, develop, test, and deploy a full-stack application with a Java-based backend and a modern TypeScript frontend.`,
    },
  },

  {
    slug: 'gossip-cache',
    name: 'Go Gossip Cache',
    image: '/projects/gossip-cache.webp',
    description:
      'Distributed in-memory cache using gossip protocol for eventual consistency.',
    tagline:
      'A distributed in-memory cache that achieves eventual consistency across N nodes using a gossip-based replication protocol — implemented in pure Go.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'wip',
    stack: 'Go · TCP · Gossip Protocol',
    concepts: 'Eventual consistency · Gossip propagation · Vector clocks',
    repo: 'https://github.com/joss12',
    content: {
      problem: `Distributed caching introduces challenges that do not exist in a single-node cache, including replication, network failures, conflicting updates, and consistency between independent nodes.`,

      priorArt: `Existing distributed caching systems provide sophisticated replication and consistency mechanisms. I wanted to explore these concepts directly through a smaller implementation in Go.`,

      designDecisions: `The project focuses on gossip-based replication, TCP communication, and eventual consistency rather than relying on a centralized coordinator.`,

      architecture: `The intended architecture consists of independent cache nodes, an in-memory storage layer, a TCP communication layer, and a gossip protocol responsible for propagating updates between peers.`,

      reflection: `The project is an opportunity to explore distributed systems, conflict resolution, network partitions, and the trade-offs between consistency and availability.`,
    },
  },

  {
    slug: 'web-crawler',
    name: 'Concurrent Web Crawler',
    image: '/projects/web-crawler.webp',
    description:
      'Full-stack concurrent website crawler with crawl controls, result analysis, graph visualization, exports, and production-style backend safeguards.',
    tagline:
      'A concurrent web crawler built with Go and Next.js — featuring bounded worker pools, crawl cancellation, SSRF protection, result analytics, interactive graph visualization, and Dockerized deployment.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'complete',
    stack: 'Go · Next.js · React · TypeScript · Docker · React Flow',
    concepts:
      'Worker pools · Context cancellation · SSRF protection · Request IDs · Panic recovery · Crawling analytics · Graph visualization · Docker',
    repo: 'https://github.com/joss12',
    live: 'https://web-crawler-frontend-ep3r.onrender.com',
    content: {
      problem: `I wanted to build a crawler that went beyond recursively fetching links. The goal was to understand bounded concurrency in Go, request cancellation, URL normalization, crawl limits, failure handling, and how to expose that backend through a useful full-stack interface.`,

      priorArt: `Many crawler examples stop at recursively fetching pages or spawning goroutines without much control over concurrency, cancellation, security, or observability. This project intentionally adds those concerns so the crawler behaves more like a real service rather than a small scraping script.`,

      designDecisions: `The crawler uses a bounded worker pool instead of creating an unbounded goroutine per URL. Crawls are organized by depth, context cancellation propagates from the browser through the HTTP request into the Go workers, and public target validation blocks localhost and private network addresses to reduce SSRF risk.

      The API also adds structured errors, request IDs, panic recovery, request logging, crawl limits, and graceful shutdown.`,

      architecture: `The backend is written in Go and is split into crawler and HTTP server packages.

      The crawler handles URL normalization, HTML parsing, bounded concurrency, crawl depth, page limits, delays, cancellation, and target validation.

      The server layer exposes health and crawl endpoints with CORS, request IDs, structured JSON errors, recovery middleware, logging, and graceful shutdown.

      The frontend is built with Next.js, React, TypeScript, Tailwind CSS, and React Flow. It provides crawl configuration, loading and cancellation states, summary metrics, HTTP status and depth breakdowns, search, filtering, sorting, pagination, page details, JSON/CSV export, and an interactive crawl graph.

      Both services are Dockerized and deployed separately on Render.`,

      reflection: `The most valuable part of this project was seeing how concurrency decisions affect the entire application. Worker limits, cancellation, request lifetime, redirects, URL validation, and error propagation all had to fit together correctly.

      It also reinforced that a useful backend project becomes much stronger when the frontend exposes the underlying behavior clearly instead of hiding it behind a single submit button.`,
    },
  },

  {
    slug: 'ptolemy-lang',
    name: 'Ptolemy Lang',
    image: '/projects/ptolemy-lang.webp',
    description:
      'Complete interpreter from scratch — lexer, parser, AST, evaluator, closures.',
    tagline:
      'A complete custom programming language interpreter built from scratch in Go — covering lexing, parsing, AST construction, evaluation, closures, and lexical scoping.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'complete',
    stack: 'Go',
    concepts:
      'Lexer · Parser · AST · Tree-walk evaluation · Closures · Lexical scoping',
    repo: 'https://github.com/joss12/Ptolemy-Lang',
    content: {
      problem: `Ptolemy is a custom programming language written in Go, featuring JavaScript-like syntax and designed for educational purposes and personal coding experimentation.`,

      priorArt: `Ptolemy is inspired by JavaScript, adopting a familiar syntax while exploring the fundamentals of interpreter design and execution in Go.`,

      designDecisions: `Ptolemy uses JavaScript-like syntax for familiarity and focuses on implementing core interpreter components (lexer, parser, AST, execution) rather than being feature-complete. It is built in Go for simplicity and clarity.`,

      architecture: `Ptolemy is structured around the core stages of language execution: lexing, parsing, AST construction, and interpretation. Each stage is separated to keep the implementation clear, modular, and easy to extend.`,

      reflection: `Building Ptolemy provided hands-on insight into how programming languages work under the hood, from parsing to execution. It highlighted the importance of clear structure, simplicity, and the trade-offs involved in language design.`,
    },
  },

  {
    slug: 'dns-resolver',
    name: 'DNS Resolver',
    image: '/projects/dns-resolver.webp',
    description:
      'DNS resolver over raw UDP — manual packet crafting, RFC 1035.',
    tagline:
      'A DNS resolver in Go to understand DNS below the standard library level. It manually constructs DNS packets, sends them over UDP, parses the binary response, and supports iterative resolution through the DNS hierarchy.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'complete',
    stack: 'Go · UDP · RFC 1035',
    concepts:
      'UDP sockets · Binary packet encoding · RFC 1035 · Iterative resolution · DNS caching',
    repo: 'https://github.com/joss12/dns-resolver',
    content: {
      problem: `DNS is the distributed naming system that maps domain names to IP addresses so clients can locate servers on the network.`,

      priorArt: `Tools such as dig and nslookup provide DNS querying capabilities, while standard networking libraries abstract away DNS packet construction and response parsing. I wanted to understand these underlying mechanisms by implementing a resolver directly in Go.`,

      designDecisions: `I separated the project into encoding, transport, decoding, and resolver layers to keep the DNS workflow modular and easier to debug. I also implemented reusable parsing functions for resource records to reduce duplication and keep the protocol handling consistent.`,

      architecture: `The architecture is organized around the DNS resolution pipeline: packet encoding, UDP communication, packet decoding, and resolver orchestration. The CLI layer handles user input and presentation, while the internal DNS package contains the protocol and resolution logic.`,

      reflection: `This project helped me understand DNS far beyond simple library lookups. The most valuable lessons came from working directly with binary packet structures, compression pointers, iterative referrals, and resolver behavior.`,
    },
  },

  {
    slug: 'cardcheck',
    name: 'cardCheck',
    image: '/projects/cardcheck.webp',
    description:
      'A full-stack card validation simulator with BIN intelligence, transaction analysis, dashboard analytics, and validation history.',
    tagline:
      'A modern fintech-inspired platform that simulates how payment systems validate cards, analyze transaction risk, retrieve BIN information, determine approval decisions, and visualize every validation step through a professional dashboard.',
    tag: 'FinTech',
    tagColor: 'text-emerald-400 bg-emerald-400/10',
    status: 'complete',
    stack:
      'Go · React · TypeScript · PostgreSQL · Redis · Docker · Chi · Vite · Tailwind CSS',
    concepts:
      'REST APIs · BIN lookup · Card brand detection · Risk scoring · Validation pipeline · Dashboard analytics · Responsive UI · PostgreSQL · Redis · Docker',
    repo: 'https://github.com/joss12',
    live: 'https://card-check-check.vercel.app',
    content: {
      problem: `Modern payment systems perform much more than a simple Luhn check. They identify the issuing bank, determine the payment network, verify the issuing country, evaluate transaction risk, and apply multiple validation rules before approving or declining a transaction.

      Most public examples only demonstrate isolated concepts such as card number validation or BIN lookups. I wanted to build a complete educational platform that simulates the workflow of a payment validation engine without processing real financial transactions.`,

      priorArt: `Many online credit-card validation tools stop after checking the Luhn algorithm or identifying the card network. They rarely expose how validation decisions are made or how different verification steps contribute to the final outcome.

      cardCheck combines BIN intelligence, issuer information, country verification, configurable validation rules, transaction history, dashboard analytics, and an interactive user interface into a single full-stack application designed for developers and learners.`,

      designDecisions: `The project is split into independent frontend and backend repositories to keep responsibilities clearly separated.

      The backend focuses on business logic, validation rules, REST APIs, PostgreSQL persistence, Redis caching, and dashboard statistics.

      The frontend consumes these APIs through a dedicated service layer while keeping presentation components independent from business logic. Validation is represented as a step-by-step pipeline so users can observe every verification stage instead of receiving only a final approval or decline.`,

      architecture: `The backend is implemented in Go using Chi and follows a layered architecture composed of HTTP handlers, services, repositories, domain models, PostgreSQL, and Redis.

      The frontend is built with React, TypeScript, and Vite using reusable components, React Router, strongly typed API models, responsive layouts, and animated user interactions.

      Major frontend modules include:

      • Landing page
      • Dashboard
      • Card validation
      • Live credit card preview
      • Card flip animation
      • Validation pipeline
      • Validation history
      • Transaction details
      • Analytics dashboard
      • Custom 404 page

      The frontend communicates with the backend through REST APIs while remaining completely decoupled from persistence and business logic.`,

      reflection: `Building cardCheck significantly strengthened my understanding of production full-stack application development.

      Beyond implementing APIs and user interfaces, the project required designing maintainable architectures, creating reusable React components, structuring Go services, integrating PostgreSQL and Redis, managing asynchronous frontend state, designing realistic validation workflows, handling deployment, configuring CORS, and delivering a responsive user experience.

      The most valuable takeaway was learning how frontend and backend systems collaborate to create software that feels cohesive, scalable, and maintainable.`,
    },
  },

  {
    slug: 'smartcart-backend',
    name: 'SmartCart API',
    image: '/projects/smartcart-api.webp',
    description:
      'Production-ready e-commerce backend — full order lifecycle, payment webhooks, BullMQ queues, Redis caching and Swagger docs.',
    tagline:
      'A production-ready e-commerce backend built with Node.js, TypeScript, PostgreSQL and Redis. Features JWT auth, cursor-based pagination, pessimistic locking to prevent overselling, payment webhook processing, background job queues, and transactional email.',
    tag: 'TypeScript',
    tagColor: 'text-blue-400 bg-blue-400/10',
    status: 'complete',
    stack: 'Node.js · TypeScript · Express 5 · PostgreSQL · Redis · BullMQ',
    concepts:
      'JWT auth · Pessimistic locking · Webhook idempotency · Background jobs · Cursor pagination',
    repo: 'https://github.com/joss12/smartcart-backend',
    swagger: 'https://smartcart-backend-i1zg.onrender.com/docs',
    content: {
      problem: `E-commerce backends look simple until you face real concurrency — two users buying the last item simultaneously, a payment webhook firing three times, an email job silently failing. SmartCart was built to handle all of these correctly from the start, not as an afterthought.`,

      priorArt: `I studied how Stripe handles idempotency and how PostgreSQL row-level locking behaves under concurrent transactions before writing a single line. The core insight: most e-commerce bugs come from optimistic assumptions about concurrency. SmartCart makes none.`,

      designDecisions: `Pessimistic locking on stock — SELECT ... FOR UPDATE inside a transaction before every checkout to prevent overselling.

      Webhook idempotency via a webhook_events table — every incoming event is recorded before processing. Duplicate webhooks are detected and discarded safely.

      Worker process separated from the API — emails, image resizing, and stock alerts run in a dedicated BullMQ worker. Jobs survive worker crashes and retry automatically.`,

      architecture: `Client → Express API (controllers → services → repositories)

      PostgreSQL — users, products, orders, audit logs.

      Redis — cart storage, product cache.

      BullMQ Worker — emails, image processing, stock alerts.`,

      reflection: `Three things I'd change: move image uploads to pre-signed S3 URLs to support horizontal scaling, replace pessimistic locking with a queue-based checkout system for higher throughput, and add dedicated failure scenario tests for the webhook idempotency logic.`,
    },
  },
];

export type OtherProject = {
  name: string;
  description: string;
  purpose: string;
  tag: string;
  tagColor: string;
  repo: string;
  package?: string;
};

export const otherProjects: OtherProject[] = [
  {
    name: 'Event Loop Simulator',
    description:
      'A visual simulator of the JavaScript event loop — call stack, task queue, and microtask queue.',
    purpose:
      'Built to deeply understand how Node.js schedules async work. Most engineers use the event loop daily without knowing exactly when microtasks run vs macrotasks.',
    tag: 'JavaScript',
    tagColor: 'text-yellow-400 bg-yellow-400/10',
    repo: 'https://github.com/joss12/Event-Loop-Simulator',
  },
  {
    name: 'Diff DOM Mini Engine',
    description:
      'A minimal virtual DOM diffing engine — computes the delta between two DOM trees and applies patches.',
    purpose:
      "Written to understand how React's reconciler works under the hood. Building it yourself forces you to think about tree traversal, key heuristics, and minimal mutations.",
    tag: 'TypeScript',
    tagColor: 'text-blue-400 bg-blue-400/10',
    repo: 'https://github.com/joss12/Diff-DOM-mini-engine',
  },
  {
    name: 'AST Practice',
    description:
      'A collection of AST traversal and transformation exercises implemented in both Go and JavaScript.',
    purpose:
      'Practice ground for working with abstract syntax trees — parsing, walking, and transforming code programmatically. Directly fed into the Ptolemy Lang interpreter.',
    tag: 'Go · JS',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    repo: 'https://github.com/joss12/AST-Practice-In-Js-Ts-and-Golanng',
  },
  {
    name: 'P2P Terminal Messenger',
    description:
      'A terminal-based peer-to-peer chat application over raw TCP with no central server.',
    purpose:
      'Built to learn NAT traversal and direct peer connections before tackling the P2P file sharing project. Kept it simple — just stdin/stdout over a socket.',
    tag: 'JavaScript',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    repo: 'https://github.com/joss12/p2p-terminal-messenger',
    package: 'peermsg — Local Peer-to-Peer Messenger (LAN/Wi-Fi)',
  },
  {
    name: 'Reactive Core',
    description:
      'A minimal reactivity system — signals, computed values, and effects — from scratch.',
    purpose:
      'Built to understand how Vue 3 and SolidJS reactivity works internally. Implements dependency tracking, lazy evaluation, and automatic effect re-runs without a framework.',
    tag: 'JavaScript',
    tagColor: 'text-blue-400 bg-blue-400/10',
    repo: 'https://github.com/joss12/reactive-core',
  },
];
