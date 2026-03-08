import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ActivityItem from '../../components/dashboard/ActivityItem';
import MetricCard from '../../components/dashboard/MetricCard';
import StatusCard from '../../components/dashboard/StatusCard';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Quick Metrics Grid */}
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

        {/* Attendee Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendee Status</Text>
          <View style={styles.card}>
            <StatusCard
              icon="checkmark-circle"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="Confirmed"
              subtitle="Ready to attend"
              count={35}
              countColor="#10B981"
            />
            <View style={styles.divider} />
            <StatusCard
              icon="time"
              iconColor="#F59E0B"
              iconBgColor="#FEF3C7"
              title="Waitlisted"
              subtitle="Waiting for spots"
              count={0}
              countColor="#F59E0B"
            />
            <View style={styles.divider} />
            <StatusCard
              icon="close-circle"
              iconColor="#EF4444"
              iconBgColor="#FEE2E2"
              title="Cancelled"
              subtitle="No longer attending"
              count={0}
              countColor="#EF4444"
            />
          </View>
        </View>

        {/* Invite Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invite Status</Text>
          <View style={styles.card}>
            <StatusCard
              icon="mail"
              iconColor="#8B5CF6"
              iconBgColor="#EDE9FE"
              title="Total Sent"
              subtitle="All invitations"
              count={84}
              countColor="#8B5CF6"
            />
            <View style={styles.divider} />
            <StatusCard
              icon="checkmark-circle"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="Accepted"
              subtitle="Used invites"
              count={21}
              countColor="#10B981"
            />
            <View style={styles.divider} />
            <StatusCard
              icon="time"
              iconColor="#6B7280"
              iconBgColor="#F3F4F6"
              title="Pending"
              subtitle="Not yet used"
              count={63}
              countColor="#6B7280"
            />
          </View>
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewText}>
              You have <Text style={styles.bold}>1</Text> total events with{' '}
              <Text style={styles.bold}>1</Text> upcoming.
            </Text>
            <Text style={styles.overviewText}>
              Out of <Text style={styles.bold}>84</Text> invitations sent,{' '}
              <Text style={styles.bold}>21</Text> have been accepted, resulting in{' '}
              <Text style={styles.bold}>35</Text> total attendees (including plus ones).
            </Text>
            <Text style={styles.overviewText}>
              Currently, <Text style={styles.bold}>35</Text> attendees are confirmed
              (including plus ones), <Text style={styles.bold}>0</Text> are waitlisted, and{' '}
              <Text style={styles.bold}>0</Text> have cancelled.
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
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
    paddingBottom: 40,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  overviewCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  overviewText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: '700',
    color: '#111827',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
