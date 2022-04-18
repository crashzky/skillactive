function normalizeImageUrl(imageUrl: string): string {
	return imageUrl.replace('/media', '');
}

export default normalizeImageUrl;
