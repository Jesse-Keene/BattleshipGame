import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MISS_HIT } from "../../../utils/DB";

interface Ship {
  shipName?: string;
  attackedBlocks: string[];
  isShipSunk?: boolean;
}

interface Stats {
  totalDeployedShips: number;
  totalShipAttacked: number;
  totalShipSunked: number;
}

interface SummaryStatsProps {
  playerDeployedShips: Ship[];
  computerDeployedShips: Ship[];
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  playerDeployedShips,
  computerDeployedShips,
}) => {
  const [playerStats, setPlayerStats] = useState<Stats | null>(null);
  const [computerStats, setComputerStats] = useState<Stats | null>(null);

  useEffect(() => {
    const tempPlayerStats = setShipStats(playerDeployedShips);
    setPlayerStats(tempPlayerStats);

    const tempComputerStats = setShipStats(computerDeployedShips);
    setComputerStats(tempComputerStats);
  }, [playerDeployedShips, computerDeployedShips]);

  const setShipStats = (playerShips: Ship[]): Stats => {
    let totalDeployedShips = 0;
    let totalShipAttacked = 0;
    let totalShipSunked = 0;

    if (playerShips && playerShips.length > 0) {
      playerShips.forEach((ship) => {
        if (ship?.shipName !== MISS_HIT) {
          totalDeployedShips++;
          totalShipAttacked =
            ship.attackedBlocks.length > 0
              ? totalShipAttacked + 1
              : totalShipAttacked;
          if (ship.isShipSunk) {
            totalShipSunked++;
          }
        }
      });
    }

    return {
      totalDeployedShips,
      totalShipAttacked,
      totalShipSunked,
    };
  };

  const StatsInfo = ({ stats }: { stats: Stats | null }) => (
    <View style={styles.statsContainer}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Ships Deployed: </Text>
        <Text style={styles.statValue}>
          {stats ? stats.totalDeployedShips : 0}
        </Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Ships Attacked: </Text>
        <Text style={styles.statValue}>
          {stats ? stats.totalShipAttacked : 0}
        </Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Ships Sunked: </Text>
        <Text style={styles.statValue}>
          {stats ? stats.totalShipSunked : 0}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerTitle}>Player</Text>
        <StatsInfo stats={playerStats} />
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerTitle}>Computer</Text>
        <StatsInfo stats={computerStats} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  playerInfo: {
    flex: 1,
    alignItems: "center",
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    width: "100%",
    padding: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SummaryStats;
