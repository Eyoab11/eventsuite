import { Redirect } from 'expo-router';

// Root index redirects to login page
export default function Index() {
  return <Redirect href="/login" />;
}
