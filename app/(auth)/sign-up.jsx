import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert('Error', 'Please fill all the fields.');
		} else {
			try {
				setIsSubmitting(true);
				const user = await createUser(form.email, form.password, form.username);

				router.replace('/home');
			} catch (error) {
				Alert.alert('Error', error.message);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View
					className='w-full flex justify-center px-4'
					style={{ minHeight: Dimensions.get('window').height - 100 }}>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='h-[35px] w-[115px]'
					/>
					<Text className='text-2xl text-white mt-10 font-psemibold'>
						Sign up
					</Text>
					<FormField
						title={'Username'}
						otherStyles={'mt-7'}
						value={form.username}
						placeholder='Your unique username'
						handleChangeText={(value) => setForm({ ...form, username: value })}
					/>
					<FormField
						title={'Email'}
						otherStyles={'mt-7'}
						value={form.email}
						handleChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<FormField
						title={'Password'}
						otherStyles={'mt-7'}
						value={form.password}
						handleChangeText={(value) => setForm({ ...form, password: value })}
					/>
					<CustomButton
						title='Sign Up'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
					/>
					<View className='flex justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Already have an account?
						</Text>
						<Link
							href='/sign-in'
							className='text-lg font-psemibold text-secondary'>
							Signin
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
