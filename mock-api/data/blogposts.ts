import type { BlogPost, FullBlogPost } from 'types';
import aiAsAGameChanger from './blogposts/ai-as-a-game-changer';
import aiDoAndDont from './blogposts/ai-do-and-dont';
import boundariesOfAi from './blogposts/boundaries-of-ai';
import cssGoodies2024 from './blogposts/css-goodies-2024';
import frontend2023InReview from './blogposts/frontend-2023-in-review';
import myFirstLocalLlm from './blogposts/my-first-local-llm';
import accessibilityIn2024 from './blogposts/accessibility-in-2024';
import vercelProprietaryProgress from './blogposts/vercel-proprietary-progress';
import healthAdviceFromAnExpert from './blogposts/health-advice-from-an-expert';

export const fullBlogposts: FullBlogPost[] = [
  aiAsAGameChanger,
  aiDoAndDont,
  boundariesOfAi,
  cssGoodies2024,
  frontend2023InReview,
  myFirstLocalLlm,
  accessibilityIn2024,
  vercelProprietaryProgress,
  healthAdviceFromAnExpert,
]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({
    ...post,
    comments: post.comments.slice().sort((c1, c2) => c2.date.localeCompare(c1.date)),
  }));

export const blogposts = fullBlogposts.map(({ body, ...post }): BlogPost => post);
