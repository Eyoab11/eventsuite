import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Invite {
  id: string;
  email: string;
  event: string;
  status: 'Pending' | 'Accepted' | 'Expired';
  sent: string;
  expires: string;
}

interface InviteTableProps {
  invites: Invite[];
}

export default function InviteTable({ invites }: InviteTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '#10B981';
      case 'Pending':
        return '#F59E0B';
      case 'Expired':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '#D1FAE5';
      case 'Pending':
        return '#FEF3C7';
      case 'Expired':
        return '#FEE2E2';
      default:
        return '#F3F4F6';
    }
  };

  const handleCopy = (email: string) => {
    console.log('Copy:', email);
    // Copy functionality will go here
  };

  const handleResend = (email: string) => {
    console.log('Resend to:', email);
    // Resend functionality will go here
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
          <View style={[styles.cell, styles.emailCell]}>
            <Text style={styles.headerText}>Email</Text>
          </View>
          <View style={[styles.cell, styles.eventCell]}>
            <Text style={styles.headerText}>Event</Text>
          </View>
          <View style={[styles.cell, styles.statusCell]}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={[styles.cell, styles.dateCell]}>
            <Text style={styles.headerText}>Sent</Text>
            <Ionicons name="arrow-down" size={14} color="#6B7280" />
          </View>
          <View style={[styles.cell, styles.dateCell]}>
            <Text style={styles.headerText}>Expires</Text>
          </View>
          <View style={[styles.cell, styles.actionsCell]}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>

        {/* Table Rows */}
        {invites.map((invite, index) => (
          <View key={invite.id} style={styles.row}>
            <View style={[styles.cell, styles.numberCell]}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={[styles.cell, styles.emailCell]}>
              <Text style={styles.cellText}>{invite.email}</Text>
            </View>
            <View style={[styles.cell, styles.eventCell]}>
              <Text style={styles.cellText}>{invite.event}</Text>
            </View>
            <View style={[styles.cell, styles.statusCell]}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(invite.status) },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(invite.status) },
                  ]}
                >
                  {invite.status}
                </Text>
              </View>
            </View>
            <View style={[styles.cell, styles.dateCell]}>
              <Text style={styles.cellText}>{invite.sent}</Text>
            </View>
            <View style={[styles.cell, styles.dateCell]}>
              <Text style={styles.cellText}>{invite.expires}</Text>
            </View>
            <View style={[styles.cell, styles.actionsCell]}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCopy(invite.email)}
                >
                  <Ionicons name="copy" size={20} color="#6366F1" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleResend(invite.email)}
                >
                  <Ionicons name="paper-plane" size={20} color="#6366F1" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewDetails(invite.id)}
                >
                  <Ionicons name="eye" size={20} color="#6366F1" />
                </TouchableOpacity>
              </View>
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
  emailCell: {
    width: 220,
  },
  eventCell: {
    width: 200,
  },
  statusCell: {
    width: 120,
  },
  dateCell: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionsCell: {
    width: 140,
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
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});
