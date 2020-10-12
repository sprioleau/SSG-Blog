import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";

const Post = ({ slug, htmlString, data }) => {
	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta title="description" content={data.description} />
			</Head>
			<div className="container">
				<p className="path">{`posts/${slug}`}</p>
				<div dangerouslySetInnerHTML={{ __html: htmlString }} />
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

	// console.log("files:", files);
	// console.log("paths:", paths);

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const markdownWithMetadata = fs
		.readFileSync(path.join("posts", slug + ".md"))
		.toString();
	const parsedMarkdown = matter(markdownWithMetadata);

	const htmlString = marked(parsedMarkdown.content);

	return {
		props: {
			slug,
			htmlString,
			data: parsedMarkdown.data,
		},
	};
};

export default Post;
