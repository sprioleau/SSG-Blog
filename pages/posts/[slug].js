import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import marked from "marked";

const Post = ({ slug, htmlString, data, paths }) => {
	const currentPostIndex = paths.indexOf(slug);
	const nextPost = currentPostIndex === paths.length - 1 ? 0 : currentPostIndex + 1;
	const prevPost = currentPostIndex === 0 ? paths.length - 1 : currentPostIndex - 1;

	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta title="description" content={data.description} />
			</Head>
			<div className="container">
				<p className="path">{`posts/${slug}`}</p>
				<div dangerouslySetInnerHTML={{ __html: htmlString }} />
				<hr />
				<div className="nav-wrapper">
					<Link href="/">
						<a className="nav-link footer">
							<span>&#8592;</span> Home <span>🏡</span>
						</a>
					</Link>
					<div className="prev-next-wrapper">
						<Link href={paths[prevPost]}>
							<a className="nav-link footer">
								<span>&#8592;</span> Previous post
							</a>
						</Link>
						<Link href={paths[nextPost]}>
							<a className="nav-link footer">
								Next post <span>&#8594;</span>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticPaths = async () => {
	const files = fs.readdirSync("posts");
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(".md", ""),
		},
	}));

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	// Get paths
	const paths = fs.readdirSync("posts").map((filename) => filename.replace(".md", ""));

	const markdownWithMetadata = fs.readFileSync(path.join("posts", slug + ".md")).toString();
	const parsedMarkdown = matter(markdownWithMetadata);

	const htmlString = marked(parsedMarkdown.content);

	return {
		props: {
			slug,
			htmlString,
			data: parsedMarkdown.data,
			paths,
		},
	};
};

export default Post;
