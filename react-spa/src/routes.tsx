import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/homepage';
import BlogPage from './pages/blog/blogpage';
import PenOverview from './pages/pens/pen-overview';
import PenDetail from './pages/pens/pen-detail';
import ContactPage from './pages/contact/contactpage';
import WikiPage from './pages/wiki/wikipage';
import { Layout } from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout children={<HomePage />} />,
  },
  {
    path: '/blog/:id',
    element: <Layout children={<BlogPage />} />,
  },
  {
    path: '/pens',
    element: <Layout children={<PenOverview />} />,
  },
  {
    path: '/pens/:id',
    element: <Layout children={<PenDetail />} />,
  },
  {
    path: '/wiki',
    element: <Layout children={<WikiPage />} />,
  },
  {
    path: '/wiki/:slug',
    element: <Layout children={<WikiPage />} />,
  },
  {
    path: '/contact',
    element: <Layout children={<ContactPage />} />,
  },
]);
