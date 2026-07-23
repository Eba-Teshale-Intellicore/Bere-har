"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/contactus.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { Mail } from "lucide-react";
import Link from "next/link";
import { getStoreLocations } from "@/src/api/storelocation";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string;
}

export default function Wishlist() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [locations, setLocations] = useState<StoreLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoreLocations();
      setLocations(data);
    };

    fetchData();
  }, []);

  if (loadError) return <p>Map failed to load.</p>;

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea2}>
            <div className={styles.content}>
              <h1>
                <Heading text="Contact_Us" />
              </h1>
            </div>
            <div>
              <div className={styles.storelocations}>
                <div className={styles.contact}>
                  <div className={styles.map}>
                    <GoogleMap
                      center={{
                        lat: Number(locations[0]?.latitude ?? 9.03),
                        lng: Number(locations[0]?.longitude ?? 38.74),
                      }}
                      zoom={7}
                    >
                      {locations.map((location) => (
                        <Marker
                          key={location.id}
                          position={{
                            lat: Number(location.latitude),
                            lng: Number(location.longitude),
                          }}
                          title={location.name}
                        />
                      ))}
                    </GoogleMap>
                  </div>
                  <div className={styles.storeList}>
                    <div>Our_Stores</div>

                    {locations.map((location) => (
                      <div key={location.id} className={styles.storeCard}>
                        <div>
                          <h3>{location.name}</h3>
                          <p>{location.address}</p>
                        </div>
                        <div>
                          <p>{location.phone}</p>
                          <p>{location.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.contact}>
                  <div className={styles.ele}>
                    <Mail size={18} />
                    <Link href="https://wa.me/2519XXXXXXXX" target="_blank">
                      WhatsApp
                    </Link>
                  </div>
                  <div className={styles.ele}>
                    <Mail size={18} />
                    <Link href="https://wa.me/2519XXXXXXXX" target="_blank">
                      WhatsApp
                    </Link>
                  </div>
                  <div className={styles.ele}>
                    <Mail size={18} />
                    <Link href="https://wa.me/2519XXXXXXXX" target="_blank">
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
