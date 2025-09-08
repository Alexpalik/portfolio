'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeModel() {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp"
    })
    
    renderer.setSize(600, 600)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.8)
    fillLight.position.set(-5, 0, 3)
    scene.add(fillLight)

    // Create pivot point for proper rotation
    let pivot: THREE.Group | null = null

    const loadModel = async () => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const loader = new GLTFLoader()

        loader.load(
          '/models/alexander_the_great.glb',
          (gltf) => {
            const alexanderModel = gltf.scene
            
            // Create a pivot group for rotation
            pivot = new THREE.Group()
            scene.add(pivot)
            
            // Get model bounding box for centering and scaling
            const box = new THREE.Box3().setFromObject(alexanderModel)
            const size = box.getSize(new THREE.Vector3())
            const center = box.getCenter(new THREE.Vector3())
            
            console.log('Original model center:', center)
            console.log('Original model size:', size)
            
            // Add model to pivot group
            pivot.add(alexanderModel)
            
            // Center the model within the pivot
            alexanderModel.position.set(-center.x, -center.y, -center.z)
            
            // Scale the entire pivot (this scales the model)
            const maxDimension = Math.max(size.x, size.y, size.z)
            const scale = 6 / maxDimension
            pivot.scale.set(scale, scale, scale)
            
            // Position the pivot at the center of the scene (fixed position)
            pivot.position.set(0, 0, 0)
            
            console.log('Alexander centered and scaled in pivot')
            console.log('Pivot position:', pivot.position)
            console.log('Model position within pivot:', alexanderModel.position)
            console.log('Scale factor:', scale)
          },
          (progress) => {
            console.log('Loading:', Math.round((progress.loaded / progress.total) * 100) + '%')
          },
          (error) => {
            console.error('Error:', error)
          }
        )
      } catch (error) {
        console.error('GLTFLoader error:', error)
      }
    }

    loadModel()

    // Position camera to look at center
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      
      // Rotate the pivot group instead of the model directly
      if (pivot) {
        pivot.rotation.y += 0.005 // Smooth 360-degree rotation
      }
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      const currentMount = mountRef.current
      const currentFrameId = frameId.current
      
      if (currentFrameId !== undefined) {
        cancelAnimationFrame(currentFrameId)
      }
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div 
        ref={mountRef} 
        className="overflow-hidden w-[510px] md:w-[700px] md:h-[700px] h-[600px]"
        
      />
    </div>
  )
}