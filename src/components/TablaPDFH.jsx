import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function TablaPDFH({ folio, fecha, hora, fn }) {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      padding: 10,
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1pt solid black',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '1pt solid black',
      height: 40,
      fontSize: 10,
    },
    tableCell: {
      flex: 1,
      paddingLeft: 5,
    },
    propertyName: {
      fontWeight: 'bold',
      backgroundColor: 'blue',
      color: 'white',
    }, title: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  const data = [
    { folio: '001', fecha: '2023-06-27', hora: '09:00 AM', gestor: 'John Doe', sucursal: 'Branch A', noPago: '1' },
    { folio: '002', fecha: '2023-06-28', hora: '02:30 PM', gestor: 'Jane Smith', sucursal: 'Branch B', noPago: '2' },
    { folio: '003', fecha: '2023-06-29', hora: '11:15 AM', gestor: 'Robert Johnson', sucursal: 'Branch C', noPago: '3' },
  ];


  return (
    <Document>

      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          {Object.keys(data[0]).map((property, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.propertyName]}>
                <Text style={{ color: 'white' }}>{property}</Text>
              </View>
              {data.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.tableCell}>{item[property]}</Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>

  )
}

export default TablaPDFH