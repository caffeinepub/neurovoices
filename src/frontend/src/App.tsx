import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { AdminPage } from "./pages/AdminPage";
import { ConditionsPage } from "./pages/ConditionsPage";
import { HomePage } from "./pages/HomePage";
import { SharePage } from "./pages/SharePage";
import { StoriesPage } from "./pages/StoriesPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const conditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/conditions",
  component: ConditionsPage,
});

const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories",
  component: StoriesPage,
});

const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share",
  component: SharePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: AboutUsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  conditionsRoute,
  storiesRoute,
  shareRoute,
  aboutRoute,
  aboutUsRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
