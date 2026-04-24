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
  swagger?: string;
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
    slug: 'gitflow-cli',
    name: 'GitFlow CLI',
    description:
      'TypeScript CLI enforcing Git branching conventions and release workflows.',
    tagline:
      'A TypeScript CLI that enforces Git branching conventions, automates versioning, and streamlines release workflows.',
    tag: 'TypeScript',
    tagColor: 'text-blue-400 bg-blue-400/10',
    status: 'complete',
    stack: 'TypeScript · Node.js · Commander.js',
    concepts:
      'Git internals · Conventional commits · Semver · Release automation',
    repo: 'https://github.com/joss12/GitFlow-CLI',
    content: {
      problem: `Most teams enforce Git conventions through code reviews and verbal agreements. This breaks down at scale — inconsistent branch names, missing commit prefixes, manual version bumps. I wanted a CLI that enforces the workflow automatically.`,
      priorArt: `git-flow exists but it's heavyweight and opinionated about the full branching model. Commitizen handles commit messages but not branching. Nothing handled the full workflow from branch creation to release in a lightweight way.`,
      designDecisions: `Chose Commander.js over yargs for its cleaner API and better TypeScript support. Kept the config in package.json under a "gitflow" key so it travels with the repo. Made all conventions overridable so teams aren't forced into my defaults.`,
      architecture: `Three main modules: branch manager (creates/validates branch names), commit linter (enforces conventional commits), and release manager (bumps version, tags, generates changelog). Each is independently usable as a library.`,
      reflection: `I'd add a --dry-run flag to every command. Teams are cautious about new CLI tools and being able to preview what would happen without executing it would lower the adoption barrier significantly.`,
    },
  },
  {
    slug: 'gossip-cache',
    name: 'Go Gossip Cache',
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
      problem: `Most teams enforce Git conventions through code reviews and verbal agreements. This breaks down at scale — inconsistent branch names, missing commit prefixes, manual version bumps. I wanted a CLI that enforces the workflow automatically.`,
      priorArt: `git-flow exists but it's heavyweight and opinionated about the full branching model. Commitizen handles commit messages but not branching. Nothing handled the full workflow from branch creation to release in a lightweight way.`,
      designDecisions: `Chose Commander.js over yargs for its cleaner API and better TypeScript support. Kept the config in package.json under a "gitflow" key so it travels with the repo. Made all conventions overridable so teams aren't forced into my defaults.`,
      architecture: `Three main modules: branch manager (creates/validates branch names), commit linter (enforces conventional commits), and release manager (bumps version, tags, generates changelog). Each is independently usable as a library.`,
      reflection: `I'd add a --dry-run flag to every command. Teams are cautious about new CLI tools and being able to preview what would happen without executing it would lower the adoption barrier significantly.`,
    },
  },
  {
    slug: 'p2p-file-sharing',
    name: 'P2P File Sharing',
    description:
      'Peer-to-peer file transfer — chunked transfer, peer discovery, NAT traversal.',
    tagline:
      'A peer-to-peer file transfer system in pure Go — covering chunked transfer, peer discovery, NAT traversal, and integrity verification.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'wip',
    stack: 'Go · TCP/UDP · Custom Protocol',
    concepts:
      'Peer discovery · Chunked transfer · NAT traversal · SHA-256 integrity',
    repo: 'https://github.com/joss12',
    content: {
      problem: `Most teams enforce Git conventions through code reviews and verbal agreements. This breaks down at scale — inconsistent branch names, missing commit prefixes, manual version bumps. I wanted a CLI that enforces the workflow automatically.`,
      priorArt: `git-flow exists but it's heavyweight and opinionated about the full branching model. Commitizen handles commit messages but not branching. Nothing handled the full workflow from branch creation to release in a lightweight way.`,
      designDecisions: `Chose Commander.js over yargs for its cleaner API and better TypeScript support. Kept the config in package.json under a "gitflow" key so it travels with the repo. Made all conventions overridable so teams aren't forced into my defaults.`,
      architecture: `Three main modules: branch manager (creates/validates branch names), commit linter (enforces conventional commits), and release manager (bumps version, tags, generates changelog). Each is independently usable as a library.`,
      reflection: `I'd add a --dry-run flag to every command. Teams are cautious about new CLI tools and being able to preview what would happen without executing it would lower the adoption barrier significantly.`,
    },
  },

  //Ptolemy lang
  {
    slug: 'ptolemy-lang',
    name: 'Ptolemy Lang',
    description:
      'Complete interpreter from scratch — lexer, parser, AST, evaluator, closures.',
    tagline:
      'A complete costum programming language interpreter built from scratch in Go — covering lexing, parsing, AST construction, evaluation, closures, and lexical scoping.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'complete',
    stack: 'Go',
    concepts:
      'Lexer · Parser · AST · Tree-walk evaluation · Closures · Lexical scoping',
    repo: 'https://github.com/joss12/Ptolemy-Lang',
    content: {
      problem: `Ptolemy is a custom programming language written in Go, featuring JavaScript-like syntax and designed for educational purposes and personal coding experimentation.`,
      priorArt: `Ptolemy is inspired by JavaScript, adopting a familiar syntax while exploring the fundamentals of interpreter design and execution in Go`,
      designDecisions: `Ptolemy uses JavaScript-like syntax for familiarity and focuses on implementing core interpreter components (lexer, parser, AST, execution) rather than being feature-complete. It is built in Go for simplicity and clarity.`,
      architecture: `Ptolemy is structured around the core stages of language execution: lexing, parsing, AST construction, and interpretation. Each stage is separated to keep the implementation clear, modular, and easy to extend..`,
      reflection: `Building Ptolemy provided hands-on insight into how programming languages work under the hood, from parsing to execution. It highlighted the importance of clear structure, simplicity, and the trade-offs involved in language design.`,
    },
  },
  {
    slug: 'dns-resolver',
    name: 'DNS Resolver',
    description:
      'DNS resolver over raw UDP — manual packet crafting, RFC 1035.',
    tagline:
      'A DNS resolver built over raw UDP sockets in Go — manual packet crafting and parsing following RFC 1035, with no external DNS libraries.',
    tag: 'Go',
    tagColor: 'text-cyan-400 bg-cyan-400/10',
    status: 'complete',
    stack: 'Go · UDP · RFC 1035',
    concepts:
      'UDP sockets · Binary packet encoding · RFC 1035 · Recursive resolution',
    repo: 'https://github.com/joss12',
    content: {
      problem: `Most teams enforce Git conventions through code reviews and verbal agreements. This breaks down at scale — inconsistent branch names, missing commit prefixes, manual version bumps. I wanted a CLI that enforces the workflow automatically.`,
      priorArt: `git-flow exists but it's heavyweight and opinionated about the full branching model. Commitizen handles commit messages but not branching. Nothing handled the full workflow from branch creation to release in a lightweight way.`,
      designDecisions: `Chose Commander.js over yargs for its cleaner API and better TypeScript support. Kept the config in package.json under a "gitflow" key so it travels with the repo. Made all conventions overridable so teams aren't forced into my defaults.`,
      architecture: `Three main modules: branch manager (creates/validates branch names), commit linter (enforces conventional commits), and release manager (bumps version, tags, generates changelog). Each is independently usable as a library.`,
      reflection: `I'd add a --dry-run flag to every command. Teams are cautious about new CLI tools and being able to preview what would happen without executing it would lower the adoption barrier significantly.`,
    },
  },

  {
    slug: 'smartcart-backend',
    name: 'SmartCart API',
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
      problem:
        'E-commerce backends look simple until you face real concurrency — two users buying the last item simultaneously, a payment webhook firing three times, an email job silently failing. SmartCart was built to handle all of these correctly from the start, not as an afterthought.',
      priorArt:
        'I studied how Stripe handles idempotency and how PostgreSQL row-level locking behaves under concurrent transactions before writing a single line. The core insight: most e-commerce bugs come from optimistic assumptions about concurrency. SmartCart makes none.',
      designDecisions:
        'Pessimistic locking on stock — SELECT ... FOR UPDATE inside a transaction before every checkout. Overselling is impossible regardless of load.Webhook idempotency via a webhook_events table — every incoming event is recorded before processing. Duplicate webhooks are detected and discarded safely.Worker process separated from the API — emails, image resizing, and stock alerts run in a dedicated BullMQ worker. Jobs survive worker crashes and retry automatically.',
      architecture:
        'Client → Express API (controllers → services → repositories)PostgreSQL — users, products, orders, audit logsRedis — cart storage, product cache BullMQ Worker — emails, image processing, stock alerts',
      reflection:
        "Three things I'd change: move image uploads to pre-signed S3 URLs to support horizontal scaling, replace pessimistic locking with a queue-based checkout system for higher throughput, and add dedicated failure scenario tests for the webhook idempotency logic.",
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
    tag: 'Javascript',
    tagColor: 'text-blue-400 bg-blue-400/10',
    repo: 'https://github.com/joss12/reactive-core',
  },
];
