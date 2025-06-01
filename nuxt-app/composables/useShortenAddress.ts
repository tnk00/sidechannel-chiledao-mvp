export const useShortenAddress = () => {
  return (address: string) => {
    if (!address || address.length < 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }
}
