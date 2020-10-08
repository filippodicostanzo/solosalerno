export interface Post {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: GUID;
    modified: Date;
    modified_gmt: Date;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: GUID;
    content: Content;
    excerpt: Content;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: any[];
    _links: PostLinks;
    _embedded: Embedded;
}

export interface Embedded {
    author: EmbeddedAuthor[];
    'wp:featuredmedia': WpFeaturedmedia[];
    'wp:term': Array<EmbeddedWpTerm[]>;
}

export interface EmbeddedAuthor {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: { [key: string]: string };
    _links: AuthorLinks;
}

export interface AuthorLinks {
    self: About[];
    collection: About[];
}

export interface About {
    href: string;
}

export interface WpFeaturedmedia {
    id: number;
    date: Date;
    slug: string;
    type: string;
    link: string;
    title: GUID;
    author: number;
    caption: GUID;
    alt_text: string;
    media_type: string;
    mime_type: MIMEType;
    media_details: MediaDetails;
    source_url: string;
    _links: WpFeaturedmediaLinks;
}

export interface WpFeaturedmediaLinks {
    self: About[];
    collection: About[];
    about: About[];
    author: ReplyElement[];
    replies: ReplyElement[];
}

export interface ReplyElement {
    embeddable: boolean;
    href: string;
}

export interface GUID {
    rendered: string;
}

export interface MediaDetails {
    width: number;
    height: number;
    file: string;
    sizes: { [key: string]: Size };
    image_meta: ImageMeta;
}

export interface ImageMeta {
    aperture: string;
    credit: string;
    camera: string;
    caption: string;
    created_timestamp: string;
    copyright: string;
    focal_length: string;
    iso: string;
    shutter_speed: string;
    title: string;
    orientation: string;
    keywords: any[];
}

export interface Size {
    file: string;
    width: number;
    height: number;
    mime_type: MIMEType;
    source_url: string;
}

export enum MIMEType {
}

export interface EmbeddedWpTerm {
    id: number;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    _links: WpTermLinks;
}

export interface WpTermLinks {
    self: About[];
    collection: About[];
    about: About[];
    'wp:post_type': About[];
    curies: Cury[];
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}

export interface PostLinks {
    self: About[];
    collection: About[];
    about: About[];
    author: ReplyElement[];
    replies: ReplyElement[];
    'version-history': VersionHistory[];
    'predecessor-version': PredecessorVersion[];
    'wp:featuredmedia': ReplyElement[];
    'wp:attachment': About[];
    'wp:term': LinksWpTerm[];
    curies: Cury[];
}

export interface PredecessorVersion {
    id: number;
    href: string;
}

export interface VersionHistory {
    count: number;
    href: string;
}

export interface LinksWpTerm {
    taxonomy: string;
    embeddable: boolean;
    href: string;
}

export interface Content {
    rendered: string;
    protected: boolean;
}
