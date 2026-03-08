import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AttendeeTable from '../../components/attendees/AttendeeTable';
import FilterDropdown from '../../components/invites/FilterDropdown';
import SearchBar from '../../components/invites/SearchBar';

// Mock data
const mockAttendees = [
  {
    id: '1',
    regId: 'REG-75059899',
    name: 'George Peters II',
    title: 'Founder at Listen TWO Me',
    email: 'george@georgetwopointoh.com',
    status: 'Confirmed' as const,
    checkedIn: false,
    related: 'Has guest: Jovian Zayne',
    date: 'Mar 6, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '2',
    regId: 'REG-75059899-P1',
    name: 'Jovian Zayne',
    title: 'Founder at The On Purpose Movement',
    email: 'jovian.irvin@gmail.com',
    status: 'Confirmed' as const,
    checkedIn: false,
    related: 'Guest of: George Peters II',
    date: 'Mar 6, 2026',
    type: 'Plus One' as const,
  },
  {
    id: '3',
    regId: 'REG-84729103',
    name: 'Sarah Mitchell',
    title: 'CEO at TechVision Inc',
    email: 'sarah.mitchell@techvision.com',
    status: 'Confirmed' as const,
    checkedIn: true,
    related: 'No guest',
    date: 'Mar 5, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '4',
    regId: 'REG-92847561',
    name: 'Michael Chen',
    title: 'Product Manager at StartupHub',
    email: 'michael.chen@startuphub.io',
    status: 'Waitlisted' as const,
    checkedIn: false,
    related: 'Has guest: Lisa Chen',
    date: 'Mar 7, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '5',
    regId: 'REG-92847561-P1',
    name: 'Lisa Chen',
    title: 'Designer at Creative Studio',
    email: 'lisa.chen@creativestudio.com',
    status: 'Waitlisted' as const,
    checkedIn: false,
    related: 'Guest of: Michael Chen',
    date: 'Mar 7, 2026',
    type: 'Plus One' as const,
  },
  {
    id: '6',
    regId: 'REG-38475629',
    name: 'David Rodriguez',
    title: 'Marketing Director at BrandWorks',
    email: 'david.r@brandworks.com',
    status: 'Confirmed' as const,
    checkedIn: true,
    related: 'No guest',
    date: 'Mar 4, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '7',
    regId: 'REG-56473829',
    name: 'Emily Watson',
    title: 'VP of Sales at CloudTech',
    email: 'emily.watson@cloudtech.com',
    status: 'Cancelled' as const,
    checkedIn: false,
    related: 'No guest',
    date: 'Mar 3, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '8',
    regId: 'REG-19283746',
    name: 'James Anderson',
    title: 'CTO at DataFlow Systems',
    email: 'james.anderson@dataflow.com',
    status: 'Confirmed' as const,
    checkedIn: true,
    related: 'Has guest: Maria Anderson',
    date: 'Mar 6, 2026',
    type: 'Attendee' as const,
  },
  {
    id: '9',
    regId: 'REG-19283746-P1',
    name: 'Maria Anderson',
    title: 'Event Coordinator at EventPro',
    email: 'maria.anderson@eventpro.com',
    status: 'Confirmed' as const,
    checkedIn: false,
    related: 'Guest of: James Anderson',
    date: 'Mar 6, 2026',
    type: 'Plus One' as const,
  },
];

export default function AttendeesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [perPage, setPerPage] = useState('50 per page');

  const typeOptions = ['All', 'Attendees', 'Plus Ones'];

  const statusOptions = ['All Statuses', 'Confirmed', 'Waitlisted', 'Cancelled'];

  const perPageOptions = ['10 per page', '20 per page', '50 per page', '100 per page'];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, email or reg ID"
        />

        {/* Filters */}
        <View style={styles.filtersRow}>
          <FilterDropdown
            label="Type"
            options={typeOptions}
            selectedValue={selectedType}
            onSelect={setSelectedType}
          />
          <View style={styles.filterGap} />
          <FilterDropdown
            label="Status"
            options={statusOptions}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
          />
          <View style={styles.filterGap} />
          <FilterDropdown
            label="Per Page"
            options={perPageOptions}
            selectedValue={perPage}
            onSelect={setPerPage}
          />
        </View>

        {/* Results Info */}
        <View style={styles.infoRow}>
          <Text style={styles.resultsText}>{mockAttendees.length} attendees</Text>
        </View>

        {/* Table */}
        <AttendeeTable attendees={mockAttendees} />
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
});
