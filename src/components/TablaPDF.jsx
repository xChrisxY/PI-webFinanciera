import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function TablaPDF({ folio, fecha, hora }) {

  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "16.6%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
    tableHead: {
      backgroundColor: 'blue',
      color: 'white'
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    body : {

      paddingTop : 20,
      
    }

  });

  return (
    <Document>

      <Page style={styles.body}>

        <View style={styles.title}>
          <Text>FINANCIERA REYES MORENO</Text>
          <Text>Reporte de Pago del día - {fecha}</Text>
          <Text>Un nuevo día para hacer el mejor trabajo</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHead}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Folio</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Fecha</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Hora</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Gestor de Cobranza</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Sucursal</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>No. Pago</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Christopher Yahir Moreno</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Christopher Yahir Moreno</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Jordi Daniel Reyes</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Christopher Yahir Moreno</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Gabriel Reyes Hernandes</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{folio}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{fecha}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hora}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Jordi Daniel Reyes</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>San Cristobal de las Casas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
          </View>  
        </View>
      </Page>
    </Document>

  )
}

export default TablaPDF