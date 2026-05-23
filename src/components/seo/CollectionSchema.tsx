interface CollectionItem {
  name: string;
  url: string;
  description?: string;
  image?: string;
  datePublished?: string;
}

interface CollectionSchemaProps {
  /** The page name, e.g. "Projects" or "Blog" */
  pageName: string;
  /** Absolute URL of the listing page */
  pageUrl: string;
  /** Description of what this page contains */
  description: string;
  /** Items in the collection — projects, blog posts, etc. */
  items: CollectionItem[];
  /** Schema type for individual items — defaults to 'CreativeWork' */
  itemType?: 'CreativeWork' | 'BlogPosting' | 'Article';
}

/**
 * Renders a CollectionPage + ItemList + BreadcrumbList for listing pages
 * like /projects and /blog. Helps Google understand the page as a curated
 * index of related content.
 */
export default function CollectionSchema({
  pageName,
  pageUrl,
  description,
  items,
  itemType = 'CreativeWork',
}: CollectionSchemaProps) {
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageName,
    url: pageUrl,
    description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calvin Liew Portfolio',
      url: 'https://calvinliew.space',
    },
    author: {
      '@type': 'Person',
      name: 'Calvin Liew',
      url: 'https://calvinliew.space',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: item.url,
        item: {
          '@type': itemType,
          name: item.name,
          url: item.url,
          ...(item.description && { description: item.description }),
          ...(item.image && { image: item.image }),
          ...(item.datePublished && { datePublished: item.datePublished }),
        },
      })),
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calvinliew.space' },
      { '@type': 'ListItem', position: 2, name: pageName, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
