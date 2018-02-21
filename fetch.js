import { config } from './package.json';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
const request = require('request');
const slugify = require('slugify');
const slugOptions = {
	replacement: '_',
	lower: true
};

const { campaigns } = config;

let json = [];

function getSlugifiedName(name) {
	return slugify(name, slugOptions);
}

function createCampaign(data, url) {
	const slug = getSlugifiedName(data.name || url);
	if (url.charAt(url.length - 1) !== '/') {
		url = url + '/';
	}
	const { thumbnail, zip } = data;
	const campaignData = {
		url,
		slug,
		thumbnail,
		zip,
		title: data.name,
		date: new Date(data.date || data.lastModified),
		banners: data.banners
	};
	fs.ensureDirSync(path.resolve(__dirname, `./src/data/projects/${slug}`));
	json.push(campaignData);
	return campaignData;
}

async function download(uri, filename, callback) {
	return request.head(uri, (err, res, body) => {
		request(uri)
			.pipe(fs.createWriteStream(filename))
			.on('close', callback);
	});
}

async function fetchCampaign(campaign) {
	const url = `${campaign}/staging-template.json`;
	return await axios({
		method: 'get',
		url
	}).then(r => createCampaign(r.data, campaign));
}

async function fetchThumb(campaign, thumbnailUrl, thumbUrl) {
	const url = `${campaign}/${thumbUrl}`;
	await download(url, thumbnailUrl, () => {
		console.log('thumbnail downloaded');
	});
}

async function fetchAllCampaigns(campaigns) {
	let list = campaigns.slice(0);

	while (list.length > 0) {
		const campaignUrl = list.shift();
		fs.ensureDirSync(path.resolve(__dirname, `./src/data/projects/`));
		const json = await fetchCampaign(campaignUrl);
		const thumbUrl = json.thumbnail || `thumbnail.png`;
		await fetchThumb(
			campaignUrl,
			`./src/data/projects/${json.slug}/${thumbUrl}`,
			thumbUrl
		);
	}

	fs.outputJsonSync(
		path.resolve(__dirname, './src/data/projects/projects.json'),
		json
	);
}

async function run() {
	await fetchAllCampaigns(campaigns);
}

run();
