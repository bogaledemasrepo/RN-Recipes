import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Handle status bar for Android
  },
  contentArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007aff',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  userIdDisplay: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
    // wordBreak: 'break-all',
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 100,
  },
  searchButtonDisabled: {
    backgroundColor: '#A5D6A7',
    elevation: 0,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#007aff',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  userIdText: {
    fontSize: 10,
    color: '#BDBDBD',
    marginTop: 4,
  },
  favoriteButton: {
    padding: 10,
    marginLeft: 10,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  errorText: {
      color: 'red',
      fontSize: 18,
  },
  // Detail Screen Styles
  detailScrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 4,
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    paddingTop: 10,
  },
  detailCategory: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  detailFavoriteButton: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  detailFavoriteButtonRed: {
    backgroundColor: '#FF6F61',
    shadowColor: '#FF6F61',
  },
  detailFavoriteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4CAF50',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    paddingLeft: 10,
    lineHeight: 22,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  tabButtonActive: {
    // No specific background style needed, use label color change
  },
  tabButtonDisabled: {
    opacity: 0.5,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#007aff',
    fontWeight: '700',
  },
  messageBox: {
      position: 'absolute',
      bottom: 80, // Above the tab bar
      left: 16,
      right: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      borderRadius: 8,
      padding: 12,
      zIndex: 10,
      alignItems: 'center',
  },
  messageBoxText: {
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
  }
});
