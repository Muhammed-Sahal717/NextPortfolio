import React from "react";
import {
  FiArrowRight,
  FiX,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiActivity,
  FiServer,
  FiGlobe,
  FiShield,
  FiWifi,
  FiSearch,
  FiClock,
  FiTag,
  FiCheckCircle,
  FiAlertTriangle,
  FiBriefcase,
  FiLink,
} from "react-icons/fi";

export type NoteCategory =
  | "Fundamentals"
  | "Architecture"
  | "AI"
  | "Industry"
  | "Workflow"
  | "Philosophy";

export type DifficultyLevel = "Fundamental" | "Intermediate" | "Advanced";

export interface NoteItemProps {
  index: number;
  id: string;
  title: string;
  subtitle?: string;
  category: NoteCategory;
  difficulty: DifficultyLevel;
  readingTime: string;
  icon?: React.ElementType;
  content: React.ReactNode;

  // Applied Learning Pattern
  learnings?: {
    reality: string; // "Why this matters in real projects"
    mistakes: string; // "Common beginner mistake"
    industry: string; // "Where you will see this in industry"
  };

  resources?: { title: string; url: string; description?: string }[];
  relatedIds?: string[];
}

export const NOTES: NoteItemProps[] = [
  // --- FUNDAMENTALS ---
  {
    index: 0,
    id: "web-flow",
    title: "What Happens When You Open a Website",
    subtitle: "The Journey",
    category: "Fundamentals",
    difficulty: "Fundamental",
    readingTime: "5 min read",
    icon: FiGlobe,
    content: (
      <>
        <p>
          It feels instant, but a massive chain reaction happens when you type{" "}
          <code>google.com</code> and hit enter.
        </p>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">1.</span>
            <div>
              <strong className="text-white">URL Parsing:</strong> Browser
              breaks down <code>https://google.com</code> into protocol, domain,
              and path.
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">2.</span>
            <div>
              <strong className="text-white">DNS Lookup:</strong> Browser asks
              "Where is google.com?". DNS server replies with IP{" "}
              <code>142.250.190.46</code>.
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">3.</span>
            <div>
              <strong className="text-white">TCP Handshake:</strong> Client and
              Server agree to talk. Syn -&gt; Syn-Ack -&gt; Ack.
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">4.</span>
            <div>
              <strong className="text-white">HTTP Request:</strong> Browser
              sends <code>GET /</code> request.
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">5.</span>
            <div>
              <strong className="text-white">Server Processing:</strong> Server
              runs logic, queries DB, and sends back HTML.
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-lime-400 font-bold font-mono">6.</span>
            <div>
              <strong className="text-white">Browser Rendering:</strong> Browser
              parses HTML, fetches CSS/JS, and paints the pixels.
            </div>
          </div>
        </div>
      </>
    ),
    learnings: {
      reality:
        "Understanding this flow is the key to debugging. Is it a DNS issue? A backend timeout? A frontend rendering bug?",
      mistakes:
        "Blaming the frontend code when the server actually sent a 500 error, or blaming the server when DNS is misconfigured.",
      industry:
        "System design interviews often ask this exact question to test depth of knowledge.",
    },
    resources: [
      {
        title: "MDN: Populating the page",
        url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
        description: "Deep dive into the critical rendering path.",
      },
      {
        title: "GitHub: What happens when...",
        url: "https://github.com/alex/what-happens-when",
        description: "The classic, extremely detailed Answer.",
      },
    ],
    relatedIds: ["http-https", "dns-domains", "latency-perf"],
  },
  {
    index: 1,
    id: "http-https",
    title: "HTTP & HTTPS",
    subtitle: "The Web's Language",
    category: "Fundamentals",
    difficulty: "Fundamental",
    readingTime: "5 min read",
    icon: FiServer,
    content: (
      <>
        <p>
          At its core, the web is just computers talking using HyperText
          Transfer Protocol (HTTP).
        </p>
        <div className="my-4">
          <h4 className="font-bold text-white mb-2">
            Request / Response Cycle
          </h4>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li>
              <strong className="text-lime-400">Client</strong> (Browser) sends
              a request.
            </li>
            <li>
              <strong className="text-lime-400">Server</strong> processes it.
            </li>
            <li>
              <strong className="text-lime-400">Response</strong> is sent back
              (Status 200 OK, 404 Not Found, etc).
            </li>
          </ul>
        </div>

        <h4 className="font-bold text-white mt-6 mb-2">HTTPS (Secure)</h4>
        <p>
          HTTPS adds encryption (TLS). Without it, anyone on the coffee shop
          wifi can read your passwords in plain text.
        </p>
      </>
    ),
    learnings: {
      reality:
        "You will spend hours debugging CORS errors and 401 Unauthorized responses. Knowing headers and status codes is a superpower.",
      mistakes:
        "Treating a 200 OK response with `success: false` in the body as a successful HTTP request (it is, but the logic failed).",
      industry:
        "Every API integration requires understanding HTTP methods (GET, POST, PUT, DELETE) and headers.",
    },
    resources: [
      {
        title: "MDN: HTTP Overview",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
      {
        title: "HTTP Status Dogs",
        url: "https://httpstatusdogs.com/",
        description: "Memorize status codes with dogs.",
      },
    ],
    relatedIds: ["web-flow", "web-security"],
  },
  {
    index: 2,
    id: "dns-domains",
    title: "DNS & Domains",
    subtitle: "The Phonebook",
    category: "Fundamentals",
    difficulty: "Fundamental",
    readingTime: "4 min read",
    icon: FiWifi,
    content: (
      <>
        <p>
          Computers don&apos;t know what &quot;google.com&quot; is. They only
          know IP addresses (like{" "}
          <code className="bg-white/10 px-1 rounded">142.250.190.46</code>).
        </p>
        <p className="mt-4">
          <strong>DNS (Domain Name System)</strong> is the phonebook that
          translates human names to IP addresses.
        </p>

        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-lime-500 my-4 text-sm font-mono">
          <p className="text-zinc-500">Browser:</p> &quot;Where is
          google.com?&quot;
          <br />
          <br />
          <p className="text-lime-400">DNS Resolver:</p> &quot;Let me check the
          Root Server... then the TLD Server (.com)... then the Authoritative
          Server...&quot;
          <br />
          <br />
          <p className="text-lime-400">DNS Resolver:</p> &quot;It&apos;s
          142.250.190.46!&quot;
        </div>
      </>
    ),
    learnings: {
      reality:
        "When a site is 'down' but works for your friend, it's often a DNS propagation issue.",
      mistakes:
        "Confusing the Registrar (where you buy the domain) with the Nameserver (where you manage the records).",
      industry:
        "Configuring A Records, CNAMEs, and MX Records is a routine task for setting up any production app.",
    },
    resources: [
      {
        title: "Cloudflare: What is DNS?",
        url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
        description: "Comprehensive guide to how DNS routing works.",
      },
    ],
    relatedIds: ["web-flow", "ports-networking"],
  },
  {
    index: 3,
    id: "ports-networking",
    title: "Ports & Networking",
    subtitle: "House Numbers",
    category: "Fundamentals",
    difficulty: "Fundamental",
    readingTime: "4 min read",
    icon: FiActivity,
    content: (
      <>
        <p>
          If an IP address is the <strong>Street Address</strong> of a server,
          the Port is the <strong>Apartment Number</strong>.
        </p>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-3 bg-white/5 rounded border border-white/5">
            <span className="text-lime-400 font-bold">Port 80</span>
            <p className="text-xs text-zinc-400">Standard HTTP</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/5">
            <span className="text-lime-400 font-bold">Port 443</span>
            <p className="text-xs text-zinc-400">Secure HTTPS</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/5">
            <span className="text-lime-400 font-bold">Port 3000 / 8080</span>
            <p className="text-xs text-zinc-400">Common Dev Servers</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/5">
            <span className="text-lime-400 font-bold">Localhost</span>
            <p className="text-xs text-zinc-400">
              Your own computer (127.0.0.1)
            </p>
          </div>
        </div>
        <p>
          When you run <code>npm run dev</code>, your computer starts listening
          on port 3000. That's why you visit <code>localhost:3000</code>.
        </p>
      </>
    ),
    learnings: {
      reality:
        "Firewalls often block weird ports. If your app works locally but not on AWS, check your Security Groups (Ports).",
      mistakes:
        "Trying to run two things on Port 3000 at the same time and getting `EADDRINUSE`.",
      industry:
        "Understanding TCP/IP ports is required for setting up databases, servers, and Docker containers.",
    },
    resources: [],
    relatedIds: ["http-https", "env-vars"],
  },
  {
    index: 4,
    id: "web-security",
    title: "Web Security Basics",
    subtitle: "Defense",
    category: "Fundamentals",
    difficulty: "Intermediate",
    readingTime: "6 min read",
    icon: FiShield,
    content: (
      <>
        <p>
          Security isn&apos;t a feature; it&apos;s a requirement. Three terms
          every developer must know:
        </p>

        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-lime-400">
              CORS (Cross-Origin Resource Sharing)
            </h4>
            <p className="text-zinc-400 text-sm mt-1">
              Browsers block request from one domain to another by default. The
              server must explicitly say &quot;I allow site X to call my
              API&quot; via headers.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lime-400">
              XSS (Cross-Site Scripting)
            </h4>
            <p className="text-zinc-400 text-sm mt-1">
              Attackers injecting malicious scripts into detailed pages viewed
              by other users. Fix: Always escape user input!
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lime-400">
              CSRF (Cross-Site Request Forgery)
            </h4>
            <p className="text-zinc-400 text-sm mt-1">
              Tricking a user&apos;s browser into performing an action (like
              &quot;Delete Account&quot;) without them knowing. Fix: Use CSRF
              tokens.
            </p>
          </div>
        </div>
      </>
    ),
    learnings: {
      reality:
        "You will encounter CORS errors on your first full-stack project. It is a browser security feature, not a bug.",
      mistakes:
        "Disabling CORS checks entirely on the server to 'just make it work'.",
      industry:
        "Security audits focus heavily on XSS and CSRF vulnerabilities.",
    },
    resources: [
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        description:
          "The standard list of the most critical web security risks.",
      },
      {
        title: "MDN: Web Security",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        description: "Mozilla's guide to securing web apps.",
      },
    ],
    relatedIds: ["http-https"],
  },
  {
    index: 5,
    id: "env-vars",
    title: "Environment Variables",
    subtitle: "Secrets Management",
    category: "Fundamentals",
    difficulty: "Fundamental",
    readingTime: "3 min read",
    icon: FiTag,
    content: (
      <>
        <p>
          Never hardcode secrets like API keys or database passwords in your
          code. If you commit them to GitHub, they are gone.
        </p>
        <p className="mt-4">
          Instead, we use <strong>Environment Variables</strong> (`.env` files).
        </p>

        <div className="mt-4 p-4 bg-white/5 rounded-lg font-mono text-sm border-l-2 border-yellow-500">
          <span className="text-zinc-500"># .env file</span>
          <br />
          DB_PASSWORD=super_secret_password
          <br />
          API_KEY=123456789
        </div>

        <p className="mt-4">
          In your code: <code>process.env.DB_PASSWORD</code>.
          <br />
          In production: You set these in your hosting dashboard (Vercel, AWS).
        </p>
      </>
    ),
    learnings: {
      reality:
        "Accidentally pushing a `.env` file to GitHub is a rite of passage. Then you have to rotate all your keys.",
      mistakes:
        "Thinking `.env` variables are secure in Client-Side (Frontend) code. They are NOT. Frontend code is public.",
      industry:
        "Managing secrets across Dev, Staging, and Production environments is a key DevOps task.",
    },
    resources: [],
    relatedIds: ["web-security"],
  },

  // --- ARCHITECTURE ---
  {
    index: 6,
    id: "state-stateless",
    title: "State vs Stateless",
    subtitle: "Scalability",
    category: "Architecture",
    difficulty: "Intermediate",
    readingTime: "5 min read",
    icon: FiLayers,
    content: (
      <>
        <p>
          <strong>Stateful:</strong> The server remembers you. (Example: A
          sticky session where you must talk to Server A because it has your
          cart data).
        </p>
        <p className="mt-2">
          <strong>Stateless:</strong> The server knows nothing. You must send
          your Token with <em>every request</em>. Any server can help you.
        </p>

        <div className="p-4 bg-lime-500/10 rounded-lg border border-lime-500/20 my-4 text-center">
          <p className="text-lime-400 font-bold">
            The Web is designed to be Stateless.
          </p>
        </div>

        <p>
          Why? Because if Server A crashes, Server B can take over instantly
          because it doesn't need to know what Server A held in memory.
        </p>
      </>
    ),
    learnings: {
      reality:
        "Scaling stateful apps is a nightmare. Stateless APIS scale infinitely by just adding more servers.",
      mistakes:
        "Storing user data in a global variable on the backend instead of a Database or Redis.",
      industry:
        "JWTs (JSON Web Tokens) are the standard for stateless authentication.",
    },
    resources: [],
    relatedIds: ["http-https", "env-vars"],
  },
  {
    index: 7,
    id: "latency-perf",
    title: "Latency vs Performance",
    subtitle: "Speed",
    category: "Architecture",
    difficulty: "Intermediate",
    readingTime: "4 min read",
    icon: FiActivity,
    content: (
      <>
        <p>
          <strong>Throughput</strong> is how many requests you can handle.{" "}
          <strong>Latency</strong> is how fast one request travels.
        </p>
        <p className="mt-4">
          You can have a powerful server (High Throughput) that is very far away
          (High Latency).
        </p>

        <div className="my-6 space-y-2 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Light travel (Fiber optic)</span>
            <span className="text-lime-400">~200km/ms</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>New York -&gt; London</span>
            <span className="text-lime-400">~70ms</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>New York -&gt; Sydney</span>
            <span className="text-lime-400">~250ms</span>
          </div>
        </div>

        <p>
          This is why we use CDNs (Content Delivery Networks) - to put data
          physically closer to the user.
        </p>
      </>
    ),
    learnings: {
      reality:
        "For AI apps, the network latency often takes longer than the model generation time.",
      mistakes:
        "Making 10 separate API calls sequentially instead of 1 parallel batch call (10x latency penalty).",
      industry:
        "Edge Computing is entirely about reducing latency by running code close to the user.",
    },
    resources: [],
    relatedIds: ["web-flow"],
  },

  // --- AI ---
  {
    index: 8,
    id: "ai-probabilistic",
    title: "AI is Probabilistic",
    subtitle: "Not Truth",
    category: "AI",
    difficulty: "Intermediate",
    readingTime: "5 min read",
    icon: FiCpu,
    content: (
      <>
        <p>
          Traditional Software is <strong>Deterministic</strong>: Input A always
          gives Output B. 2 + 2 always equals 4.
        </p>
        <p className="mt-4">
          AI Models (LLMs) are <strong>Probabilistic</strong>: They don&apos;t
          &quot;know&quot; facts. They predict the <em>next likely token</em>{" "}
          based on patterns.
        </p>

        <div className="p-4 bg-white/5 rounded-lg my-4 text-sm italic border-l-2 border-purple-500">
          &quot;The capital of France is [Paris]&quot; (99% probability)
        </div>

        <p>
          This means AI can hallucinate. It can be confidently wrong. You cannot
          treat it like a database.
        </p>
      </>
    ),
    learnings: {
      reality:
        "You must build 'Guardrails' and verification steps around AI outputs. Trust but verify.",
      mistakes:
        "Letting AI write SQL queries and running them directly against a production database without checking.",
      industry:
        "The biggest challenge in AI engineering is reliability, not clever prompting.",
    },
    resources: [],
    relatedIds: ["ai-workflow"],
  },
  {
    index: 9,
    id: "prompt-system",
    title: "Prompt vs System Design",
    subtitle: "Architecture",
    category: "AI",
    difficulty: "Advanced",
    readingTime: "6 min read",
    icon: FiLayers,
    content: (
      <>
        <p>
          Many beginners think &quot;Prompt Engineering&quot; is the whole job.
          It isn&apos;t.
        </p>
        <p className="mt-2">
          A prompt affects <strong>one</strong> interaction. System design
          affects the <strong>reliability</strong> of the whole.
        </p>

        <ul className="list-disc list-inside space-y-2 mt-4 text-zinc-400">
          <li>
            <strong className="text-white">Prompt:</strong> &quot;Write me a
            poem.&quot;
          </li>
          <li>
            <strong className="text-white">System:</strong> Retrieve user
            history -&gt; Select best model -&gt; Inject context -&gt; Run
            Prompt -&gt; Verify Output -&gt; Cache Result.
          </li>
        </ul>
        <p className="mt-4">
          Good architecture beats a good prompt every time.
        </p>
      </>
    ),
    learnings: {
      reality:
        "Prompts are fragile. Models update and break prompts. Robust systems (RAG, Caching, Evals) survive model changes.",
      mistakes:
        "spending 3 days tweaking a prompt instead of giving the model better data (RAG).",
      industry:
        "We are moving from 'Prompt Engineering' to 'AI Systems Engineering'.",
    },
    resources: [],
    relatedIds: ["ai-probabilistic", "vibe-coding"],
  },
  {
    index: 10,
    id: "ai-workflow",
    title: "How I Use AI",
    subtitle: "Workflow",
    category: "Workflow",
    difficulty: "Intermediate",
    readingTime: "4 min read",
    icon: FiCpu,
    content: (
      <>
        <p>I treat AI as:</p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 mb-4">
          <li>A fast assistant for implementation</li>
          <li>A second pair of eyes during debugging</li>
          <li>A tool for exploring approaches quickly</li>
        </ul>

        <p>But I avoid:</p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 mb-4">
          <li>Accepting generated code without understanding it</li>
          <li>Building features I cannot explain</li>
          <li>Skipping architecture thinking</li>
        </ul>
      </>
    ),
    learnings: {
      reality: "AI writes code faster, but you still own the debug loop.",
      mistakes:
        "Copy-pasting code that introduces a security vulnerability because you didn't read it.",
      industry:
        "Copilot is standard, but Seniors use it to type faster, Juniors use it to type features they don't understand (dangerous).",
    },
    resources: [],
    relatedIds: ["vibe-coding"],
  },

  // --- PHILOSOPHY ---
  {
    index: 11,
    id: "vibe-coding",
    title: "Vibe Coding",
    subtitle: "Philosophy",
    category: "Philosophy",
    difficulty: "Fundamental",
    readingTime: "3 min read",
    icon: FiCode,
    content: (
      <>
        <p>
          Vibe coding isn't about laziness. It's about maintaining{" "}
          <strong className="text-lime-400">Flow State</strong>.
        </p>
        <p className="mt-2">
          It means using tools to remove the friction between <em>Idea</em> and{" "}
          <em>Execution</em>.
        </p>
        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-lime-500 my-4">
          <p className="text-sm font-mono text-lime-400 mb-2">THE GOAL:</p>
          <p>Idea → System breakdown → AI acceleration → Refinement</p>
        </div>
      </>
    ),
    learnings: {
      reality:
        "Speed matters. The faster you see a result, the faster you learn.",
      mistakes:
        "Confusing 'Vibe Coding' with 'Blind Coding'. You must still understand the system.",
      industry:
        "The best developers are often the ones who can iterate the fastest.",
    },
    resources: [
      {
        title: "The Pragmatic Programmer",
        url: "https://pragprog.com/",
        description: "Classic book on software craftsmanship.",
      },
    ],
    relatedIds: ["ai-workflow"],
  },

  // --- INDUSTRY ---
  {
    index: 12,
    id: "project-lessons",
    title: "Lessons from Building",
    subtitle: "Retrospective",
    category: "Industry",
    difficulty: "Intermediate",
    readingTime: "6 min read",
    icon: FiBriefcase,
    content: (
      <>
        <p>Things that only become clear after you ship multiple projects:</p>
        <ul className="list-disc list-inside space-y-4 mt-4 text-zinc-300">
          <li>
            <strong className="text-white">Data Flow &gt; Syntax:</strong> Which
            language you use matters less than how your data moves through the
            system.
          </li>
          <li>
            <strong className="text-white">Simplicity Scales:</strong> Clever
            one-liners are a nightmare to debug 6 months later. Boring code is
            good code.
          </li>
          <li>
            <strong className="text-white">Debugging is the Job:</strong>{" "}
            Writing new features is 20% of the work. Maintenance and debugging
            is 80%.
          </li>
          <li>
            <strong className="text-white">Users Don&apos;t Care:</strong> They
            don&apos;t care about your tech stack. They care if it works.
          </li>
        </ul>
      </>
    ),
    learnings: {
      reality: "Tutorials teach syntax. Building teaches engineering.",
      mistakes:
        "Spending weeks choosing a tech stack instead of building the MVP.",
      industry: "Seniors delete code. Juniors add code.",
    },
    resources: [],
  },
  {
    index: 13,
    id: "product-code",
    title: "Product &gt;&gt;&gt; Code",
    subtitle: "Focus",
    category: "Industry",
    difficulty: "Fundamental",
    readingTime: "3 min read",
    icon: FiCheckCircle,
    content: (
      <>
        <p>
          Code is a liability. It has bugs, needs maintenance, and requires
          understanding.
        </p>
        <p className="mt-2">
          The Product is the Asset. The value provided to the user.
        </p>
        <p className="mt-4 text-lime-400 font-bold">
          Write the minimum amount of code necessary to deliver maximum value.
        </p>
      </>
    ),
    learnings: {
      reality: "The best code is no code.",
      mistakes:
        "Over-engineering a solution for a problem that doesn't exist yet.",
      industry:
        "Product Engineers are highly valued because they bridge the gap between business value and technical implementation.",
    },
    resources: [],
  },
  {
    index: 14,
    id: "80-20-rule",
    title: "The 80/20 Rule",
    subtitle: "Efficiency",
    category: "Workflow",
    difficulty: "Fundamental",
    readingTime: "2 min read",
    icon: FiActivity,
    content: (
      <>
        <p>80% of the value comes from 20% of the work.</p>
        <p className="mt-2">
          Identify that 20% (The Core Feature) and build it first. Perfect is
          the enemy of done.
        </p>
      </>
    ),
    learnings: {
      reality: "You will never finish a project if you try to make it perfect.",
      mistakes: "Polishing the UI before the backend even works.",
      industry: "Time-to-market often decides winners, not code quality.",
    },
    resources: [],
  },
  {
    index: 15,
    id: "reading-code",
    title: "Reading Code",
    subtitle: "Skill",
    category: "Workflow",
    difficulty: "Intermediate",
    readingTime: "3 min read",
    icon: FiCode,
    content: (
      <>
        <p>
          You will spend 10x more time reading code than writing it. Optimizing
          for readability is optimizing for the future.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4 text-zinc-400">
          <li>Use descriptive variable names</li>
          <li>Write comments for &quot;Why&quot;, not &quot;What&quot;</li>
          <li>Keep functions small and focused</li>
        </ul>
      </>
    ),
    learnings: {
      reality:
        "You will hate your own code 6 months from now if you don't write it clearly.",
      mistakes:
        "Writing 'clever' one-liners that nobody (including you) can understand later.",
      industry:
        "Code reviews focus heavily on readability and maintainability.",
    },
    resources: [],
  },
  {
    index: 16,
    id: "system-1-2",
    title: "System 1 vs System 2",
    subtitle: "Thinking",
    category: "Philosophy",
    difficulty: "Intermediate",
    readingTime: "4 min read",
    icon: FiCpu,
    content: (
      <>
        <p>
          <strong>System 1:</strong> Fast, intuitive, automatic. (Vibe coding,
          using patterns you know).
        </p>
        <p className="mt-1">
          <strong>System 2:</strong> Slow, deliberate, analytical. (Debugging
          concurrency issues, designing architecture).
        </p>
        <p className="my-2">
          Memorizing syntax matters less.
          <br />
          <span className="text-white font-bold">
            Understanding systems matters more.
          </span>
        </p>
      </>
    ),
    learnings: {
      reality:
        "Juniors get stuck in System 1 (trying random things). Seniors switch to System 2 when things get hard.",
      mistakes:
        "Guess-and-check debugging instead of reading the error message.",
      industry: "Root cause analysis requires deep System 2 thinking.",
    },
    resources: [],
  },
];
