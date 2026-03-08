import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ActivityItem from '../../components/dashboard/ActivityItem';
import MetricCard from '../../components/dashboard/MetricCard';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.row}>
            <MetricCard
              title="Total Events"
              value="1"
              subtitle="1 upcoming"
              icon="calendar"
              iconColor="#6366F1"
              iconBgColor="#EEF2FF"
            />
            <View style={styles.gap} />
            <MetricCard
              title="Total Attendees"
              value="35"
              subtitle="Including plus ones"
              icon="people"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
            />
          </View>

          <View style={styles.row}>
            <MetricCard
              title="Pending RSVPs"
              value="63"
              subtitle="84 total invites"
              icon="mail"
              iconColor="#F59E0B"
              iconBgColor="#FEF3C7"
            />
            <View style={styles.gap} />
            <MetricCard
              title="Check-in Rate"
              value="0%"
              subtitle="0 checked in"
              icon="checkmark-circle"
              iconColor="#8B5CF6"
              iconBgColor="#EDE9FE"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <ActivityItem
              icon="checkmark-circle"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="George Peters II registered for the event"
              subtitle="Levy Eromo Media Launch"
              time="2d ago"
            />
            <ActivityItem
              icon="checkmark-circle"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="Darryll Scott registered for the event"
              subtitle="Levy Eromo Media Launch"
              time="2d ago"
            />
            <ActivityItem
              icon="checkmark-circle"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="Ani Akpan registered for the event"
              subtitle="Levy Eromo Media Launch"
              time="2d ago"
            />
            <ActivityItem
              icon="mail"
              iconColor="#8B5CF6"
              iconBgColor="#EDE9FE"
              title="Invite sent to Candice.buchanan@outlook.com"
              subtitle="Levy Eromo Media Launch"
              time="2d ago"
            />
            <ActivityItem
              icon="mail"
              iconColor="#8B5CF6"
              iconBgColor="#EDE9FE"
              title="Invite sent to john.doe@example.com"
              subtitle="Levy Eromo Media Launch"
              time="2d ago"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  metricsGrid: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  gap: {
    width: 12,
  },
  activitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
