import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    type?: string;
    name?: string;
}

const SEO = ({ title, description, keywords, type = 'website', name = 'VideoLighter' }: SEOProps) => {
    const { t } = useTranslation();

    const seoTitle = title || t('seo.title');
    const seoDescription = description || t('seo.description');
    const seoKeywords = keywords || t('seo.keywords');

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{seoTitle}</title>
            <meta name='description' content={seoDescription} />
            <meta name='keywords' content={seoKeywords} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:site_name" content={name} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:image" content={`${window.location.origin}/VideoLighter_meta_image.png`} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={`${window.location.origin}/VideoLighter_meta_image.png`} />

            {/* Canonical link */}
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
};

export default SEO;
