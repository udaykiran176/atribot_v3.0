'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
import { LEVELS, LevelId } from '@/lib/constants'
import { Plus, Search, Copy, Download, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

interface LicenseKey {
  id: string
  key: string
  level: LevelId
  used: boolean
  assignedUserId: string | null
  createdAt: string
}

const sampleKeys: LicenseKey[] = [
  { id: '1', key: 'AB12-CD34-EF56-GH01', level: 'LEVEL_1', used: true, assignedUserId: 'user123', createdAt: '2024-01-15' },
  { id: '2', key: 'AB12-CD34-EF56-GH02', level: 'LEVEL_2', used: false, assignedUserId: null, createdAt: '2024-01-16' },
  { id: '3', key: 'XY98-ZW76-VU54-TS32', level: 'LEVEL_3', used: false, assignedUserId: null, createdAt: '2024-01-17' },
  { id: '4', key: 'MN43-OP21-QR09-ST87', level: 'LEVEL_4', used: true, assignedUserId: 'user456', createdAt: '2024-01-18' },
  { id: '5', key: 'IJ65-KL43-MN21-OP09', level: 'LEVEL_5', used: false, assignedUserId: null, createdAt: '2024-01-19' },
]

const generateRandomKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments: string[] = []
  for (let i = 0; i < 4; i++) {
    let segment = ''
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    segments.push(segment)
  }
  return segments.join('-')
}

export default function Page() {
  const [keys, setKeys] = useState<LicenseKey[]>(sampleKeys)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('ALL')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [generateCount, setGenerateCount] = useState('1')
  const [generateLevel, setGenerateLevel] = useState<LevelId>('LEVEL_1')
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [qrKey, setQrKey] = useState<LicenseKey | null>(null)

  const filteredKeys = keys.filter(key => {
    const matchesSearch = key.key.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === 'ALL' || key.level === filterLevel
    const matchesStatus = filterStatus === 'ALL' || (filterStatus === 'used' && key.used) || (filterStatus === 'unused' && !key.used)
    return matchesSearch && matchesLevel && matchesStatus
  })

  const handleGenerate = () => {
    const count = parseInt(generateCount)
    const newKeys: LicenseKey[] = []
    for (let i = 0; i < count; i++) {
      newKeys.push({ id: `${Date.now()}-${i}`, key: generateRandomKey(), level: generateLevel, used: false, assignedUserId: null, createdAt: new Date().toISOString().split('T')[0] })
    }
    setKeys([...newKeys, ...keys])
    setIsGenerateOpen(false)
    toast({ title: 'Keys Generated! 🎉', description: `${count} new ${LEVELS[generateLevel].name} key(s) created.` })
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({ title: 'Copied!', description: 'License key copied to clipboard.' })
  }

  const handleExportCSV = () => {
    const csv = ['Key,Level,Status,Assigned To,Created At', ...filteredKeys.map(k => `${k.key},${LEVELS[k.level].name},${k.used ? 'Used' : 'Available'},${k.assignedUserId || ''},${k.createdAt}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'atribot-license-keys.csv'
    a.click()
    toast({ title: 'Exported!', description: 'License keys exported to CSV.' })
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search keys..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Levels" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              {(Object.keys(LEVELS) as LevelId[]).map(level => (
                <SelectItem key={level} value={level}>{LEVELS[level].icon} Level {LEVELS[level].number}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="unused">Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}><Download className="w-4 h-4 mr-2" />Export</Button>
          <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
            <DialogTrigger asChild>
              <Button variant="hero"><Plus className="w-4 h-4 mr-2" />Generate Keys</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">Generate License Keys</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Kit Level</Label>
                  <Select value={generateLevel} onValueChange={(v) => setGenerateLevel(v as LevelId)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(LEVELS) as LevelId[]).map(level => (
                        <SelectItem key={level} value={level}>{LEVELS[level].icon} Level {LEVELS[level].number} – {LEVELS[level].name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Number of Keys</Label>
                  <Input type="number" min="1" max="100" value={generateCount} onChange={(e) => setGenerateCount(e.target.value)} />
                </div>
                <Button variant="hero" className="w-full" onClick={handleGenerate}>Generate {generateCount} Key(s)</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Key</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-mono">{key.key}</TableCell>
                    <TableCell>
                      <Badge className={LEVELS[key.level].color}>{LEVELS[key.level].icon} Level {LEVELS[key.level].number}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.used ? 'secondary' : 'default'}>{key.used ? 'Used' : 'Available'}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{key.assignedUserId || '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{key.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleCopyKey(key.key)}><Copy className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setQrKey(key)}><QrCode className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!qrKey} onOpenChange={() => setQrKey(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display">Print QR Card</DialogTitle></DialogHeader>
          {qrKey && (
            <div className="text-center space-y-4 py-4">
              <div className="bg-white p-4 rounded-xl inline-block">
                <QRCodeSVG value={`https://www.atribot.in/kit_activation?key=${qrKey.key}`} size={200} level="H" />
              </div>
              <div className="space-y-2">
                <p className="font-mono text-lg">{qrKey.key}</p>
                <Badge className={LEVELS[qrKey.level].color}>{LEVELS[qrKey.level].icon} Level {LEVELS[qrKey.level].number} – {LEVELS[qrKey.level].name}</Badge>
              </div>
              <Button variant="outline" className="w-full" onClick={() => window.print()}>Print Card</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
