import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert('Error', 'Please fill all the fields.');
		} else {
			try {
				setIsSubmitting(true);
				await signIn(form.email, form.password);

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
						Sign in
					</Text>
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
					<View className='flex-row justify-end'>
						<Text className='text-gray-100 text-sm mt-4'>Forgot Password</Text>
					</View>
					<CustomButton
						title='Sign In'
						handlePress={submit}
						containerStyles='mt-4'
						isLoading={isSubmitting}
					/>
					<View className='flex justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Don't have an account?
						</Text>
						<Link
							href='/sign-up'
							className='text-lg font-psemibold text-secondary'>
							Signup
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
