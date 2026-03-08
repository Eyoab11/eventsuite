import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterDropdown from '../../components/invites/FilterDropdown';
import InviteTable from '../../components/invites/InviteTable';
import SearchBar from '../../components/invites/SearchBar';

// Mock data
const mockInvites = [
  {
    id: '1',
    email: 'john.doe@example.com',
    event: 'Levy Eromo Media Launch',
    status: 'Pending' as const,
    sent: 'Mar 6, 2026',
    expires: 'Mar 13, 2026',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    event: 'Tech Conference 2026',
    status: 'Accepted' as const,
    sent: 'Mar 5, 2026',
    expires: 'Mar 12, 2026',
  },
  {
    id: '3',
    email: 'bob.wilson@example.com',
    event: 'Levy Eromo Media Launch',
    status: 'Expired' as const,
    sent: 'Feb 28, 2026',
    expires: 'Mar 7, 2026',
  },
  {
    id: '4',
    email: 'alice.johnson@example.com',
    event: 'Annual Gala',
    status: 'Accepted' as const,
    sent: 'Mar 4, 2026',
    expires: 'Mar 11, 2026',
  },
  {
    id: '5',
    email: 'charlie.brown@example.com',
    event: 'Levy Eromo Media Launch',
    status: 'Pending' as const,
    sent: 'Mar 6, 2026',
    expires: 'Mar 13, 2026',
  },
  {
    id: '6',
    email: 'diana.prince@example.com',
    event: 'Tech Conference 2026',
    status: 'Pending' as const,
    sent: 'Mar 7, 2026',
    expires: 'Mar 14, 2026',
  },
  {
    id: '7',
    email: 'edward.norton@example.com',
    event: 'Annual Gala',
    status: 'Accepted' as const,
    sent: 'Mar 3, 2026',
    expires: 'Mar 10, 2026',
  },
  {
    id: '8',
    email: 'fiona.apple@example.com',
    event: 'Levy Eromo Media Launch',
    status: 'Expired' as const,
    sent: 'Feb 27, 2026',
    expires: 'Mar 6, 2026',
  },
];

export default function InvitesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [perPage, setPerPage] = useState('50 per page');

  const eventOptions = [
    'All Events',
    'Levy Eromo Media Launch',
    'Tech Conference 2026',
    'Annual Gala',
  ];

  const statusOptions = ['All Statuses', 'Pending', 'Accepted', 'Expired'];

  const perPageOptions = ['10 per page', '20 per page', '50 per page', '100 per page'];

  const handleCreateInvite = () => {
    console.log('Create invite clicked');
    router.push('/create-invite');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by email or token"
        />

        {/* Filters */}
        <View style={styles.filtersRow}>
          <FilterDropdown
            label="Event"
            options={eventOptions}
            selectedValue={selectedEvent}
            onSelect={setSelectedEvent}
          />
          <View style={styles.filterGap} />
          <FilterDropdown
            label="Status"
            options={statusOptions}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </View>

        {/* Results Info and Pagination */}
        <View style={styles.infoRow}>
          <Text style={styles.resultsText}>{mockInvites.length} invites</Text>
          <View style={styles.perPageContainer}>
            <FilterDropdown
              label="Per Page"
              options={perPageOptions}
              selectedValue={perPage}
              onSelect={setPerPage}
            />
          </View>
        </View>

        {/* Table */}
        <InviteTable invites={mockInvites} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateInvite}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
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
    paddingBottom: 100,
  },
  filtersRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    zIndex: 10,
  },
  filterGap: {
    width: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 1,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  perPageContainer: {
    width: 140,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
