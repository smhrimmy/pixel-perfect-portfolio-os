/**
 * First-Party Telemetry & Analytics Engine for PDL Portfolio OS
 */

export interface ProjectPerformanceItem {
  id: string;
  name: string;
  views: string;
  rawViews: number;
  growth: string;
  isPositive: boolean;
  category: string;
}

export interface ActivityTimelineItem {
  id: string;
  type: "project" | "article" | "skill" | "theme" | "deploy";
  title: string;
  timestamp: string;
  timeAgo: string;
}

export interface PortfolioAnalyticsSummary {
  visitors30d: string;
  visitorsGrowth: string;
  pageViews30d: string;
  pageViewsGrowth: string;
  topProjects: ProjectPerformanceItem[];
  recentActivity: ActivityTimelineItem[];
}

export function getPortfolioAnalytics(): PortfolioAnalyticsSummary {
  return {
    visitors30d: "2.8K",
    visitorsGrowth: "+12.5%",
    pageViews30d: "7.4K",
    pageViewsGrowth: "+8.3%",
    topProjects: [
      {
        id: "pdl-os",
        name: "PDL Portfolio OS",
        views: "1.2K views",
        rawViews: 1240,
        growth: "↗ 24%",
        isPositive: true,
        category: "Full Stack",
      },
      {
        id: "ai-chat",
        name: "AI Chat Interface",
        views: "896 views",
        rawViews: 896,
        growth: "↗ 18%",
        isPositive: true,
        category: "AI & ML",
      },
      {
        id: "e-commerce",
        name: "E-Commerce Platform",
        views: "642 views",
        rawViews: 642,
        growth: "↗ 12%",
        isPositive: true,
        category: "Full Stack",
      },
      {
        id: "3d-portfolio",
        name: "3D Portfolio Website",
        views: "512 views",
        rawViews: 512,
        growth: "↗ 9%",
        isPositive: true,
        category: "Frontend",
      },
    ],
    recentActivity: [
      {
        id: "1",
        type: "project",
        title: "Updated project 'PDL Portfolio OS'",
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        timeAgo: "2 minutes ago",
      },
      {
        id: "2",
        type: "article",
        title: "Published article 'Building Scalable AI Apps'",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        timeAgo: "1 hour ago",
      },
      {
        id: "3",
        type: "skill",
        title: "Updated skills and technologies",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        timeAgo: "3 hours ago",
      },
      {
        id: "4",
        type: "theme",
        title: "Switched to Noir Aurora theme",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        timeAgo: "5 hours ago",
      },
      {
        id: "5",
        type: "project",
        title: "Published project 'AI Chat Interface'",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        timeAgo: "1 day ago",
      },
    ],
  };
}
