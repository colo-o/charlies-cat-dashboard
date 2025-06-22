# Charlie's Cat Dashboard

A modern Angular application for managing users and their feline friends. This dashboard provides a clean interface to view, search, and manage user and cat information.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and the [Angular CLI](https://angular.dev/tools/cli) installed.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd charlies-cat-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Pre-Commit Hooks (Husky)

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality standards on staged files before they are committed. The pre-commit hook is configured to run `lint-staged`, which will automatically lint and format your code.

The setup is handled automatically. When you run `npm install`, the `prepare` script in `package.json` executes `husky` and sets up the Git hooks. No further action is required.

## Architecture

This project is built using a modern, scalable, and maintainable architecture based on the latest Angular features.

-   **Standalone Components:** We use standalone components, directives, and pipes as the default. This approach eliminates the need for `NgModules`, reducing boilerplate and making dependency management more explicit and straightforward within each component.

-   **Feature-First Organization:** The codebase is structured around business features (e.g., `user-list`, `user-detail`) rather than technical types. Each feature is a self-contained unit with its own components, services, and routes. This "feature-slicing" makes the application easier to navigate, scale, and maintain.

-   **Core & Shared Modules:**
    -   `src/app/core`: Contains application-wide singleton services (like `AuthService` and `LoggerService`) that are instantiated only once.
    -   `src/app/shared`: Holds reusable, presentation-focused components (like `ButtonComponent`, `TableComponent`, and `PaginatorComponent`) that are used across multiple features.

This architecture promotes **SOLID** and **DRY** principles, leading to a codebase that is easier to test, debug, and extend over time.

## Challenges

- The most "tricky" and challenging thing on this test definitly was trying to make content projection through `<ng-template>` and `<ng-container>`. Without a doubt this was the hardest thing to figure out and to understand.

## Bonus Features

We've implemented several features to enhance the user experience and development workflow:

-   **Lazy Loading:** Feature routes are lazy-loaded to ensure the initial application bundle is small and fast, improving initial load times.
-   **Responsive Collapsible Sidebar:** The navigation sidebar is fully responsive and collapses on mobile devices to provide an optimal viewing experience on any screen size.
-   **Advanced User Table:** The user list includes robust functionality for searching across all user fields and filtering by different criteria.
-   **Global Error Handling:** An HTTP interceptor automatically catches API errors and displays user-friendly snack bar notifications, ensuring users are always informed of issues.
-   **CI & Pre-Commit Hooks:** The project is configured with linting and formatting checks that run automatically before each commit, ensuring consistent code style and quality across the codebase.
