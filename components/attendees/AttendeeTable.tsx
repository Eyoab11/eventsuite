import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Attendee {
  id: string;
  regId: string;
  name: string;
  title: string;
  email: string;
  status: 'Confirmed' | 'Waitlisted' | 'Cancelled';
  checkedIn: boolean;
  related: string;
  date: string;
  type: 'Attendee' | 'Plus One';
}

interface AttendeeTableProps {
  attendees: Attendee[];
}

export default function AttendeeTable({ attendees }: AttendeeTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#10B981';
      case 'Waitlisted':
        return '#F59E0B';
      case 'Cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#D1FAE5';
      case 'Waitlisted':
        return '#FEF3C7';
      case 'Cancelled':
        return '#FEE2E2';
      default:
        return '#F3F4F6';
    }
  };

  const handleViewDetails = (id: string) => {
    console.log('View details:', id);
    // Navigation to details will go here
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <View style={[styles.cell, styles.numberCell]}>
            <Text style={styles.headerText}>#</Text>
          </View>
          <View style={[styles.cell, styles.typeCell]}>
            <Text style={styles.headerText}>Type</Text>
          </View>
          <View style={[styles.cell, styles.regIdCell]}>
            <Text style={styles.headerText}>Reg ID</Text>
          </View>
          <View style={[styles.cell, styles.nameCell]}>
            <Text style={styles.headerText}>Name</Text>
          </View>
          <View style={[styles.cell, styles.emailCell]}>
            <Text style={styles.headerText}>Email</Text>
          </View>
          <View style={[styles.cell, styles.statusCell]}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={[styles.cell, styles.checkedInCell]}>
            <Text style={styles.headerText}>Checked In</Text>
          </View>
          <View style={[styles.cell, styles.relatedCell]}>
            <Text style={styles.headerText}>Related</Text>
          </View>
          <View style={[styles.cell, styles.dateCell]}>
            <Text style={styles.headerText}>Date</Text>
            <Ionicons name="arrow-down" size={14} color="#6B7280" />
          </View>
          <View style={[styles.cell, styles.actionsCell]}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>

        {/* Table Rows */}
        {attendees.map((attendee, index) => (
          <View key={attendee.id} style={styles.row}>
            <View style={[styles.cell, styles.numberCell]}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={[styles.cell, styles.typeCell]}>
              <Text style={styles.cellText}>{attendee.type}</Text>
            </View>
            <View style={[styles.cell, styles.regIdCell]}>
              <Text style={styles.cellText}>{attendee.regId}</Text>
            </View>
            <View style={[styles.cell, styles.nameCell]}>
              <Text style={styles.cellText}>{attendee.name}</Text>
              <Text style={styles.titleText}>{attendee.title}</Text>
            </View>
            <View style={[styles.cell, styles.emailCell]}>
              <Text style={styles.cellText}>{attendee.email}</Text>
            </View>
            <View style={[styles.cell, styles.statusCell]}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(attendee.status) },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(attendee.status) },
                  ]}
                >
                  {attendee.status}
                </Text>
              </View>
            </View>
            <View style={[styles.cell, styles.checkedInCell]}>
              <View style={styles.checkContainer}>
                {attendee.checkedIn ? (
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                ) : (
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                )}
              </View>
            </View>
            <View style={[styles.cell, styles.relatedCell]}>
              <Text style={styles.cellText}>{attendee.related}</Text>
            </View>
            <View style={[styles.cell, styles.dateCell]}>
              <Text style={styles.cellText}>{attendee.date}</Text>
            </View>
            <View style={[styles.cell, styles.actionsCell]}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleViewDetails(attendee.id)}
              >
                <Ionicons name="eye" size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  numberCell: {
    width: 60,
  },
  numberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  typeCell: {
    width: 120,
  },
  regIdCell: {
    width: 120,
  },
  nameCell: {
    width: 200,
  },
  emailCell: {
    width: 240,
  },
  statusCell: {
    width: 120,
  },
  checkedInCell: {
    width: 100,
    alignItems: 'center',
  },
  relatedCell: {
    width: 150,
  },
  dateCell: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionsCell: {
    width: 80,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cellText: {
    fontSize: 14,
    color: '#374151',
  },
  titleText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    padding: 4,
  },
});
