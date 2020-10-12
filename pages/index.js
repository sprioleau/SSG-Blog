import Link from "next/link";
import fs from "fs";

const Home = ({ slugs }) => {
	return (
		<div className="home-container">
			<div className="home-container__wrapper">
				<h1>Welcome to the blog 👋🏾</h1>
				{slugs.map((slug) => (
					<Link key={slug} href={`posts/${slug}`}>
						<a className="nav-link">{`Go to ${slug}`}</a>
					</Link>
				))}
			</div>
		</div>
	);
};

export const getStaticProps = async () => {
	const files = fs.readdirSync("posts");
	const slugs = files.map((filename) => filename.replace(".md", ""));

	return {
		props: {
			slugs,
		},
	};
};

export default Home;
