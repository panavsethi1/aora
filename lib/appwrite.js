import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.techiedoor.aora',
	projectId: '66864088003732780ca3',
	databaseId: '66864358000b109536c2',
	videosCollectionId: '6686436f000809d8cd37',
	usersCollectionId: '6686436300066a81b7bb',
	storageId: '668668d1001c717a9979',
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	videosCollectionId,
	usersCollectionId,
	storageId,
} = config;

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Create user
export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (err) {
		throw new Error(err);
	}
}

// Sign in
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		throw new Error(error);
	}
}

// Sign out
export async function signOut() {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error) {
		throw new Error(error);
	}
}

// Get account
export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}

// Get current user
export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			databaseId,
			usersCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

// Get all video posts
export async function getAllPosts() {
	try {
		const posts = await databases.listDocuments(databaseId, videosCollectionId);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}

// Get latest video posts
export async function getLatestPosts() {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}

// Get search video posts
export async function getSearchPosts(query) {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.search('title', query)]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}
